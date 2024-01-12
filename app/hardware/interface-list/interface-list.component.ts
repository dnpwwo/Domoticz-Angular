import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InterfaceService } from "../interface.service";
import { Interface, InterfacesMessage } from "../interface";
import { InterfaceComponent } from '../interface/interface.component';
import { ConfirmationDialogComponent } from 'src/app/system/confirmation-dialog/confirmation-dialog.component';
import { InterfaceListWatcherService } from 'src/app/hardware/interface-list/interface-list-watcher.service';
import { FilterDialogComponent } from 'src/app/system/filter-dialog/filter-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'dmz-interface-list',
  templateUrl: './interface-list.component.html',
  styleUrls: ['./interface-list.component.css']
})
export class InterfaceListComponent implements AfterViewInit, OnDestroy {

//tableColumns: string[] = ['InterfaceID', 'Name', 'Script', 'Configuration', 'Notifiable', 'Active'];
  tableColumns: string[] = ['InterfaceID', 'Name', 'Debug', 'Notifiable', 'Active'];
  selectedRow: Interface;
  selectedRowNumber = 0;
  selectedRowActive = 0;
  dialogConfig = new MatDialogConfig();
  webSocketSubscriber: any;
  isActive: boolean = false;

  dataSource: MatTableDataSource<Interface>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private interfaceService: InterfaceService,
    private snackBar: MatSnackBar,
    private location: Location,
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
    this.dialogConfig.width = "90%";
    this.dialogConfig.height = "80%";
    this.isActive = true;
  }

  loadData() {
    this.interfaceService.getInterfaces().subscribe((InterfacesMsg: InterfacesMessage) => {
      if (InterfacesMsg != null) {
        this.dataSource = new MatTableDataSource(InterfacesMsg.Interfaces);
        this.snackBar.open(InterfacesMsg.Count + ' Interface' + (this.dataSource.data.length > 1 ? 's' : '') + ' loaded. ', '', { duration: 3000 });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate =
          (data: Interface, filtersJson: string) => {
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
      else this.snackBar.open('No Interfaces returned. ', '', { duration: 5000 });
      return;
    }, (error) => {
      this.snackBar.open(error.statusText, '', { duration: 10000 });
    })
  }

  getItems(): Interface[] {
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
    return new InterfaceListWatcherService(
      () => console.log("Interfaces Websocket connected."),
      () => this.getItems(),
      () => {
        console.log("Interfaces Websocket disconnected."),
          this.unsubscribe();
      })
      .subscribe(
        (values: Interface[], reason: string) => {
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
        this.snackBar.open("Interface List socket has disconnected.", 'Retry').onAction().subscribe(() => { this.ngAfterViewInit(); });
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
    this.dialogConfig.data = new Interface();
    const dialogRef = this.dialog.open(InterfaceComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.interfaceService.createInterface(result);
      }
    });
  }

  onEdit() {
    this.dialogConfig.data = this.selectedRow;
    const dialogRef = this.dialog.open(InterfaceComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result) {
        this.interfaceService.updateInterface(this.selectedRow.InterfaceID, result);
      }
    });
  }

  onDelete() {
    const dialogRef = this.deleteDialog.open(ConfirmationDialogComponent, {
      width: '75%',
      data: "Please confirm deletion of interface '" + this.selectedRow.Name + "'?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.interfaceService.deleteInterface(this.selectedRow.InterfaceID);
        this.selectedRow = null;
      }
    });
  }

  onStart() {
    debugger;
    this.selectedRow.Active = true;
    this.interfaceService.updateInterface(this.selectedRow.InterfaceID, this.selectedRow);
  }

  onStop() {
    debugger;
    this.selectedRow.Active = false;
    this.interfaceService.updateInterface(this.selectedRow.InterfaceID, this.selectedRow);
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

