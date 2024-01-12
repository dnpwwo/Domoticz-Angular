import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ValueService } from "src/app/detail/value.service";
import { Value, ValuesMessage } from "src/app/detail/value";
import { ValueComponent } from 'src/app/detail/value/value.component';
import { ConfirmationDialogComponent } from 'src/app/system/confirmation-dialog/confirmation-dialog.component';
import { ValueListWatcherService } from 'src/app/hardware/value-list/value-list-watcher.service';
import { FilterDialogComponent } from 'src/app/system/filter-dialog/filter-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'dmz-value-list',
  templateUrl: './value-list.component.html',
  styleUrls: ['./value-list.component.css']
})
export class ValueListComponent implements AfterViewInit, OnDestroy {

  tableColumns: string[] = ['ValueID', 'Name', 'InternalID', 'UnitID', 'Value', 'RetentionDays', 'RetentionInterval', 'Debug', 'Timestamp'];
  selectedRow: Value;
  selectedRowNumber = 0;
  dialogConfig = new MatDialogConfig();
  webSocketSubscriber: any;
  isActive: boolean = false;

  dataSource: MatTableDataSource<Value>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private valueService: ValueService,
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
    this.dialogConfig.width = "75%";
    this.isActive = true;
  }

  loadData() {
    this.valueService.getValues(this.route.snapshot.params['id']).subscribe(
      (ValuesMsg: ValuesMessage) => {
        if (ValuesMsg != null) {
          this.dataSource = new MatTableDataSource(ValuesMsg.Values);
          this.snackBar.open(ValuesMsg.Count + ' Value' + (this.dataSource.data.length > 1 ? 's' : '') + ' loaded. ', '', { duration: 3000 });
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.filterPredicate =
            (data: Value, filtersJson: string) => {
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
        else {
          this.snackBar.open('No Values returned. ', '', { duration: 5000 });
        }
        console.log('Value list load complete.')
      },
      (error) => { this.snackBar.open(error.statusText, '', { duration: 10000 }); });
  }

  getItems(): Value[] {
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
    return new ValueListWatcherService(
      () => console.log("Values Websocket connected."),
      () => this.getItems(),
      () => {
        console.log("Values Websocket disconnected."),
        this.unsubscribe();
      },
      this.route.snapshot.params['id'])
      .subscribe(
          (values: Value[], reason: string) => {
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
      if (this.isActive) {
        this.snackBar.open("Value List socket has disconnected.", 'Retry').onAction().subscribe(() => { this.ngAfterViewInit(); });
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
    // Default dropdown to parent
    this.dialogConfig.data = new Value();
    this.dialogConfig.data.DeviceID = this.route.snapshot.params['id'];
    const dialogRef = this.dialog.open(ValueComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (typeof (result.DeviceID) == "object") {
          result.DeviceID = result.DeviceID.DeviceID;
        }
        if (typeof (result.UnitID) == "object") {
          result.UnitID = result.UnitID.UnitID;
        }
        this.valueService.createValue(result);
      }
    });
  }

  onEdit() {
    this.dialogConfig.data = this.selectedRow;
    const dialogRef = this.dialog.open(ValueComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (typeof (result.DeviceID) == "object") {
          result.DeviceID = result.DeviceID.DeviceID;
        }
        if (typeof (result.UnitID) == "object") {
          result.UnitID = result.UnitID.UnitID;
        }
        this.valueService.updateValue(this.selectedRow.ValueID, result);
      }
    });
  }

  onDelete() {
    const dialogRef = this.deleteDialog.open(ConfirmationDialogComponent, {
      width: '75%',
      data: "Please confirm deletion of value '" + this.selectedRow.Name + "'?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.valueService.deleteValue(this.selectedRow.ValueID);
        this.selectedRow = null;
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
