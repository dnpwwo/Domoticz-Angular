import { Component, OnInit, Inject, Optional, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tile } from "../tile";

import { Tab, TabsMessage } from "../tab";
import { TabService } from "../tab.service";

@Component({
  selector: 'dmz-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  tabs: Tab[];
  form: FormGroup;

  constructor(
    private tabService: TabService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TileComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Tile) {

    // Undefined when creating a new Tile
    if (data == undefined) {
      data = new Tile();
    }

    // Initialise the form
    this.form = fb.group({
      TileID: [data.TileID],
      TabID: [data.TabID, Validators.required],
      Name: [data.Name, Validators.compose([Validators.required])],
      DisplayOrder: [data.DisplayOrder],
      Background: [data.Background],
      RowSpan: [data.RowSpan],
      ColumnSpan: [data.ColumnSpan],
      BorderRadius: [data.BorderRadius],
    });

    this.tabService.getTabs().subscribe((TabsMsg: TabsMessage) => {
      // This sets the Options in the Select control
      this.tabs = TabsMsg.Tabs;
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  formIsValid() {
    return this.form.valid;
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
    else {
      this.snackBar.open('Data is not valid. ', '', { duration: 5000 });
    }
  }

  // Required to make the Select control work
  compareTabObjects(tab: Tab, index: number) {
    return tab && index && (tab.TabID == index);
  }
}
