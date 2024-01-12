import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InterfaceLogService } from "../interface-log.service";
import { InterfaceLog, InterfaceLogsMessage } from "../interface-log";
import { InterfaceLogListWatcherService } from 'src/app/hardware/interface-log-list/interface-log-list-watcher.service';
import { FilterDialogComponent } from 'src/app/system/filter-dialog/filter-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'dmz-interface-log-list',
  templateUrl: './interface-log-list.component.html',
  styleUrls: ['./interface-log-list.component.css']
})
export class InterfaceLogListComponent implements AfterViewInit, OnDestroy {

  tableColumns: string[] = ['Timestamp', 'Message'];
  webSocketSubscriber: any;

  dataSource: MatTableDataSource<InterfaceLog>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private interfaceService: InterfaceLogService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private filterDialog: MatDialog) { }

  goBack() {
    this.location.back();
    console.log('goBack()...');
  }

  ngAfterViewInit() {
    this.interfaceService.getInterfaceLogs(this.route.snapshot.params['id']).subscribe((InterfaceLogsMsg: InterfaceLogsMessage) => {
      if (InterfaceLogsMsg != null) {
        this.dataSource = new MatTableDataSource(InterfaceLogsMsg.InterfaceLogs);
        this.snackBar.open(InterfaceLogsMsg.Count + ' Interface Log entr' + (this.dataSource.data.length > 1 ? 'ies' : 'y') + ' loaded. ', '', { duration: 3000 });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate =
          (data: InterfaceLog, filtersJson: string) => {
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
        //      console.log(this.getItems());
      }
      else this.snackBar.open('No Interface Logs returned. ', '', { duration: 5000 });
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

  getItems(): InterfaceLog[] {
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
    return new InterfaceLogListWatcherService(
      () => console.log("InterfaceLogs Websocket connected."),
      () => this.getItems(),
      () => {
        console.log("InterfaceLogs Websocket disconnected."),
          this.unsubscribe();
      },
      this.route.snapshot.params['id'])
      .subscribe(
        (values: InterfaceLog[], reason: string) => {
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
              debugger;
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
      this.snackBar.open("Interface Log List socket has disconnected.", 'Retry').onAction().subscribe(() => { this.ngAfterViewInit(); });
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
