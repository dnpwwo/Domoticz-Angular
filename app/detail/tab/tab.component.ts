import { Component, OnInit, Inject, Optional, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tab } from "../tab";

import { Layout, LayoutsMessage } from "../layout";
import { LayoutService } from "../layout.service";

@Component({
  selector: 'dmz-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  layouts: Layout[];
  form: FormGroup;

  constructor(
    private layoutService: LayoutService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TabComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Tab) {

    // Undefined when creating a new Tab
    if (data == undefined) {
      data = new Tab();
    }

    // Initialise the form
    this.form = fb.group({
      TabID: [data.TabID],
      LayoutID: [data.LayoutID, Validators.required],
      Name: [data.Name, Validators.compose([Validators.required])],
      DisplayOrder: [data.DisplayOrder],
      Icon: [data.Icon],
      Background: [data.Background],
      RowHeight: [data.RowHeight],
      MinColumns: [data.MinColumns],
      MaxColumns: [data.MaxColumns],
      MinColWidth: [data.MinColWidth],
      MaxColWidth: [data.MaxColWidth],
      GutterSize: [data.GutterSize]
    });

    this.layoutService.getLayouts().subscribe((LayoutsMsg: LayoutsMessage) => {
      // This sets the Options in the Select control
      this.layouts = LayoutsMsg.Layouts;
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
  compareLayoutObjects(layout: Layout, index: number) {
    return layout && index && (layout.LayoutID == index);
  }
}
