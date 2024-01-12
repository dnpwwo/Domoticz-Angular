import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableAccessService } from "../table-access.service";
import { TableAccess, TableAccesssMessage } from "../table-access";
import { TableAccessComponent } from '../table-access/table-access.component';
import { ConfirmationDialogComponent } from 'src/app/system/confirmation-dialog/confirmation-dialog.component';
import { TableAccessListWatcherService } from 'src/app/identity/table-access-list/table-access-list-watcher.service';
import { FilterDialogComponent } from 'src/app/system/filter-dialog/filter-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'dmz-table-access-list',
  templateUrl: './table-access-list.component.html',
  styleUrls: ['./table-access-list.component.css']
})
export class TableAccessListComponent implements AfterViewInit, OnDestroy {

  tableColumns: string[] = ['TableAccessID', 'Name', 'RoleID', 'CanGET', 'CanPOST', 'CanPUT', 'CanPATCH', 'CanDELETE', 'DontGETFields', 'PUTFields', 'PATCHFields'];
  selectedRow: TableAccess;
  selectedRowNumber = 0;
  dialogConfig = new MatDialogConfig();
  webSocketSubscriber: any;
  isActive: boolean = false;

  dataSource: MatTableDataSource<TableAccess>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private tableAccessService: TableAccessService,
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
    this.tableAccessService.getTableAccesss(this.route.snapshot.params['id']).subscribe((TableAccessMsg: TableAccesssMessage) => {
      if (TableAccessMsg != null) {
        this.dataSource = new MatTableDataSource(TableAccessMsg.TableAccesss);
        this.snackBar.open(TableAccessMsg.Count + ' Table Access' + (this.dataSource.data.length > 1 ? 'es' : '') + ' loaded. ', '', { duration: 3000 });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate =
          (data: TableAccess, filtersJson: string) => {
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
        this.snackBar.open('No Table Accesses returned. ', '', { duration: 5000 });
        this.dataSource = new MatTableDataSource([]);
      }
      return;
    }, (error) => {
        this.snackBar.open(error.statusText, '', { duration: 10000 });
    })
  }

  getItems(): TableAccess[] {
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
    return new TableAccessListWatcherService(
      () => console.log("TableAccesss Websocket connected."),
      () => this.getItems(),
      () => {
        console.log("TableAccesss Websocket disconnected."),
          this.unsubscribe();
      })
      .subscribe(
        (values: TableAccess[], reason: string) => {
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
        this.snackBar.open("Table Access List socket has disconnected.", 'Retry').onAction().subscribe(() => { this.ngAfterViewInit(); });
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
    this.dialogConfig.data = new TableAccess();
    this.dialogConfig.data.RoleID = this.route.snapshot.params['id'];
    const dialogRef = this.dialog.open(TableAccessComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (typeof (result.RoleID) == "object") {
          result.RoleID = result.RoleID.RoleID;
        }
        this.tableAccessService.createTableAccess(result);
      }
    });
  }

  onEdit() {
    this.dialogConfig.data = this.selectedRow;
    const dialogRef = this.dialog.open(TableAccessComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (typeof (result.TableAccessID) == "object") {
          result.RoleID = result.RoleID.RoleID;
        }
        this.tableAccessService.updateTableAccess(this.selectedRow.TableAccessID, result);
      }
    });
  }

  onDelete() {
    const dialogRef = this.deleteDialog.open(ConfirmationDialogComponent, {
      width: '75%',
      data: "Please confirm deletion of table access for '" + this.selectedRow.Name + "'?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger;
        this.tableAccessService.deleteTableAccess(this.selectedRow.TableAccessID);
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
