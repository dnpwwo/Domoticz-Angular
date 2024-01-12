import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValueTimerService } from "../value-timer.service";
import { ValueTimer, ValueTimersMessage } from "../value-timer";
import { ValueTimerComponent } from '../value-timer/value-timer.component';
import { ConfirmationDialogComponent } from 'src/app/system/confirmation-dialog/confirmation-dialog.component';
import { ValueTimerListWatcherService } from 'src/app/hardware/value-timer-list/value-timer-list-watcher.service';
import { FilterDialogComponent } from 'src/app/system/filter-dialog/filter-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'dmz-value-timer-list',
  templateUrl: './value-timer-list.component.html',
  styleUrls: ['./value-timer-list.component.css']
})
export class ValueTimerListComponent implements AfterViewInit, OnDestroy {

  tableColumns: string[] = ['ValueTimerID', 'Name', 'DayMask', 'Sunrise', 'Sunset', 'Random'];
  selectedRow: ValueTimer;
  selectedRowNumber = 0;
  dialogConfig = new MatDialogConfig();
  webSocketSubscriber: any;
  isActive: boolean = false;

  dataSource: MatTableDataSource<ValueTimer>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private valueTimerService: ValueTimerService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private deleteDialog: MatDialog,
    private filterDialog: MatDialog) { }

  goBack() {
    this.location.back();
    console.log('goBack()...');
  }

  ngAfterViewInit() {
    this.loadData();
    this.webSocketSubscriber = this.subscribe();
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = "80%";
    this.isActive = true;
  }

  loadData() {
    this.valueTimerService.getValueTimers(this.route.snapshot.params['id']).subscribe((ValueTimersMsg: ValueTimersMessage) => {
      if (ValueTimersMsg != null) {
        this.dataSource = new MatTableDataSource(ValueTimersMsg.ValueTimers);
        this.snackBar.open(ValueTimersMsg.Count + ' Value Timer' + (this.dataSource.data.length > 1 ? 's' : '') + ' loaded. ', '', { duration: 3000 });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate =
          (data: ValueTimer, filtersJson: string) => {
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
      else this.snackBar.open('No Value Timers returned. ', '', { duration: 5000 });
      return;
    }, (error) => {
      this.snackBar.open(error.statusText, '', { duration: 10000 });
    })
  }

  getItems(): ValueTimer[] {
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
    return new ValueTimerListWatcherService(
      () => console.log("ValueTimers Websocket connected."),
      () => this.getItems(),
      () => {
        console.log("ValueTimers Websocket disconnected."),
          this.unsubscribe();
      })
      .subscribe(
        (values: ValueTimer[], reason: string) => {
          if (this.dataSource == undefined) {
            this.dataSource = new MatTableDataSource();
          }
          this.dataSource.data = values;
          if (reason != "") {
            this.snackBar.open(reason, '', { duration: 3000 });
          }
        },
        Error => {
          if (typeof (Error.type) == undefined) {
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
      if (this.isActive) {
        this.snackBar.open("Value Timer List socket has disconnected.", 'Retry').onAction().subscribe(() => { this.ngAfterViewInit(); });
      }
    }
  }

  // Called when user navigates away
  ngOnDestroy() {
    this.isActive = false;
    if (typeof (this.webSocketSubscriber) != "undefined") {
      this.webSocketSubscriber.unsubscribe();
    }
  }

  onNew() {
    this.dialogConfig.data = new ValueTimer();
    this.dialogConfig.data.ValueID = this.route.snapshot.params['id'];
    const dialogRef = this.dialog.open(ValueTimerComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (typeof (result.TimerPlanID) == "object") {
          result.TimerPlanID = result.TimerPlanID.TimerPlanID;
        }
        this.valueTimerService.createValueTimer(result);
      }
    });
  }

  onEdit() {
    this.dialogConfig.data = this.selectedRow;
    const dialogRef = this.dialog.open(ValueTimerComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.valueTimerService.updateValueTimer(this.selectedRow.ValueTimerID, result);
      }
    });
  }

  onDelete() {
    const dialogRef = this.deleteDialog.open(ConfirmationDialogComponent, {
      width: '75%',
      data: "Please confirm deletion of Value Timer '" + this.selectedRow.Name + "'?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.valueTimerService.deleteValueTimer(this.selectedRow.ValueTimerID);
      }
    });
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
    let columnName = ((typeof this.dataSource.sort.active != 'undefined') ? this.dataSource.sort.active : "Name");
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
