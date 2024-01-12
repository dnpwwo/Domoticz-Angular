import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PreferenceService } from "../preference.service";
import { Preference, PreferencesMessage } from "../preference";
import { PreferenceComponent } from "../preference/preference.component";
import { ConfirmationDialogComponent } from 'src/app/system/confirmation-dialog/confirmation-dialog.component';
import { PreferenceListWatcherService } from 'src/app/system/preference-list/preference-list-watcher.service';
import { FilterDialogComponent } from 'src/app/system/filter-dialog/filter-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'dmz-preference-list',
  templateUrl: './preference-list.component.html',
  styleUrls: ['./preference-list.component.css']
})
export class PreferenceListComponent implements AfterViewInit, OnDestroy {

  tableColumns: string[] = ['PreferenceID', 'Name', 'Value'];
  selectedRow: Preference;
  selectedRowNumber = 0;
  dialogConfig = new MatDialogConfig();
  webSocketSubscriber: any;

  dataSource: MatTableDataSource<Preference>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private preferenceService: PreferenceService,
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
  this.dialogConfig.width = "60%";
  }

  loadData() {
    this.preferenceService.getPreferences().subscribe((PreferencesMsg: PreferencesMessage) => {
      if (PreferencesMsg != null) {
        this.dataSource = new MatTableDataSource(PreferencesMsg.Preferences);
        this.snackBar.open(PreferencesMsg.Count + ' Preference' + (this.dataSource.data.length > 1 ? 's' : '') + ' loaded. ', '', { duration: 3000 });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate =
          (data: Preference, filtersJson: string) => {
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
      else this.snackBar.open('No Preferences returned. ', '', { duration: 5000 });
      return;
    }, (error) => {
        this.snackBar.open(error.statusText, '', { duration: 10000 });
    })
  }

  getItems(): Preference[] {
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
  return new PreferenceListWatcherService(
    () => console.log("Preferences Websocket connected."),
    () => this.getItems(),
    () => {
      console.log("Preferences Websocket disconnected."),
        this.unsubscribe();
    })
    .subscribe(
      (values: Preference[], reason: string) => {
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
    this.snackBar.open("Preference List socket has disconnected.", 'Retry').onAction().subscribe(() => { this.ngAfterViewInit(); });
  }
}

  // Called when user navigates away
  ngOnDestroy() {
  if (typeof (this.webSocketSubscriber) != "undefined") {
    this.webSocketSubscriber.unsubscribe();
  }
}

  onNew() {
    this.dialogConfig.data = new Preference();
    const dialogRef = this.dialog.open(PreferenceComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.preferenceService.createPreference(result);
      }
    });
  }

  onEdit() {
    this.dialogConfig.data = this.selectedRow;
    const dialogRef = this.dialog.open(PreferenceComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.preferenceService.updatePreference(this.selectedRow.PreferenceID, result);
      }
    });
  }

  onDelete() {
    const dialogRef = this.deleteDialog.open(ConfirmationDialogComponent, {
      width: '75%',
      data: "Please confirm deletion of preference '" + this.selectedRow.Name + "'?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.preferenceService.deletePreference(this.selectedRow.PreferenceID);
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
