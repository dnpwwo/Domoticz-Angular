import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceLogService } from "../device-log.service";
import { DeviceLog, DeviceLogsMessage } from "../device-log";
import { DeviceLogListWatcherService } from 'src/app/hardware/device-log-list/device-log-list-watcher.service';
import { FilterDialogComponent } from 'src/app/system/filter-dialog/filter-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'dmz-device-log-list',
  templateUrl: './device-log-list.component.html',
  styleUrls: ['./device-log-list.component.css']
})
export class DeviceLogListComponent implements AfterViewInit, OnDestroy {

  tableColumns: string[] = ['Timestamp', 'Message'];
  webSocketSubscriber: any;

  dataSource: MatTableDataSource<DeviceLog>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private deviceService: DeviceLogService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private filterDialog: MatDialog) { }

  goBack() {
    this.location.back();
    console.log('goBack()...');
  }

  ngAfterViewInit() {
    this.deviceService.getDeviceLogs(this.route.snapshot.params['id']).subscribe((DeviceLogsMsg: DeviceLogsMessage) => {
      if (DeviceLogsMsg != null) {
        this.dataSource = new MatTableDataSource(DeviceLogsMsg.DeviceLogs);
        this.snackBar.open(DeviceLogsMsg.Count + ' Device Log entr' + (this.dataSource.data.length > 1 ? 'ies' : 'y') + ' loaded. ', '', { duration: 3000 });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate =
          (data: DeviceLog, filtersJson: string) => {
            const matchFilter = [];
            const filters = JSON.parse(filtersJson);

            filters.forEach(filter => {
              const val = data[filter.id] === null ? '' : data[filter.id];
              if (typeof val == "string") {
                matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
              }
              else {
                matchFilter.push(val.toString().includes(filter.value.toLowerCase()));
              }
            });
            return matchFilter.every(Boolean);
          };
        console.log(this.getItems());
      }
      else this.snackBar.open('No Device Logs returned. ', '', { duration: 5000 });
      return;
    }, (error) => {
      this.snackBar.open(error.statusText, '', { duration: 10000 });
    })

    this.webSocketSubscriber = this.subscribe();
  }

  ngOnDestroy() {
    if (typeof (this.webSocketSubscriber) != "undefined") {
      this.webSocketSubscriber.unsubscribe();
    }
  }

  getItems(): DeviceLog[] {
    if (typeof (this.dataSource) == "undefined") {
      return [];
    }
    return this.dataSource.data;
  }

  getItemCount(): number {
    if ((typeof (this.dataSource) == "undefined") || (typeof (this.dataSource.data) == "undefined")) {
      return 0;
    }
    return this.dataSource.data.length;
  }

  subscribe() {
    return new DeviceLogListWatcherService(
      () => console.log("DeviceLogs Websocket connected."),
      () => this.getItems(),
      () => {
        console.log("DeviceLogs Websocket disconnected."),
          this.unsubscribe();
      },
      this.route.snapshot.params['id'])
      .subscribe(
        (values: DeviceLog[], reason: string) => {
          this.dataSource.data = values;
          if (reason != "") {
            this.snackBar.open(reason, '', { duration: 3000 });
          }
        },
        Error => {
          if (typeof (Error.type) == "undefined") {
            this.snackBar.open("Domoticz error '" + Error.message + "'.", 'Retry').onAction().subscribe(() => { this.ngAfterViewInit(); });
          }
          else {
            if (Error.type != 'close') {
              console.log("WebSocket error:" + Error.type);
              this.snackBar.open("Domoticz error '" + Error.type + "'.", 'Retry').onAction().subscribe(() => { this.ngAfterViewInit(); });
            } else {
              this.snackBar.open("Domoticz terminated the connection.", 'Retry').onAction().subscribe(() => { this.ngAfterViewInit(); });
            }
          }
        });
  }

  unsubscribe() {
    if (typeof (this.webSocketSubscriber) != "undefined") {
      this.webSocketSubscriber.unsubscribe();
      this.snackBar.open("Device Log List socket has disconnected.", 'Retry').onAction().subscribe(() => { this.ngAfterViewInit(); });
    }
  }

  onFilter() {
    const dialogRef = this.filterDialog.open(FilterDialogComponent, {
      width: '40%',
      data: this.getFilter(this.dataSource.filter)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (typeof result != 'undefined') {
        this.dataSource.filter = this.getFilter(result);
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
    });
  }

getFilter(Filter: string = ''): string {
  let columnName = ((typeof this.dataSource.sort.active != 'undefined') ? this.dataSource.sort.active : "Timestamp");
  let Value = '';

  if (Filter.length) {
    let json = JSON.parse(Filter);
    Value = json[0].value;
  }

  const tableFilters = [];
  tableFilters.push({ id: columnName, value: Value });
  return JSON.stringify(tableFilters);
}
}
