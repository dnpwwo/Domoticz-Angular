// ACE Editor imports
import 'brace';
import 'brace/mode/text';
import 'brace/ext/searchbox';
import 'brace/theme/xcode';
import 'brace/theme/clouds';
import 'brace/mode/python';

import { Component, OnInit, Inject, Optional, AfterViewInit, ViewChild } from '@angular/core';
import { AceConfigInterface } from 'ngx-ace-wrapper';
import { AceComponent } from 'ngx-ace-wrapper';
import { MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Interface } from "../interface";

@Component({
  selector: 'dmz-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit, AfterViewInit {

  form: FormGroup;

  public show: boolean = true;
  public content: string = '';

  public config: AceConfigInterface = {
    mode: 'python',
    theme: 'xcode',
    readOnly: false,
    tabSize: 4,
    minLines: 45
  };

  @ViewChild(AceComponent) componentRef?: AceComponent;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InterfaceComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Interface) {

    // Undefined when creating a new Interface
    if (data == undefined) {
      data = new Interface();
    }

    // Initialise the form
    this.form = fb.group({
      InterfaceID: [data.InterfaceID],
      Name: [data.Name, Validators.compose([Validators.required, Validators.minLength(8)])],
      Script: [data.Script],
      Configuration: [data.Configuration, Validators.required],
      Debug: [data.Debug],
      Notifiable: [data.Notifiable],
      Active: [data.Active]
    });
    this.content = data.Script;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // To get the Ace instance:
    // this.componentRef.directiveRef.ace();
    this.config.maxLines = (window.innerHeight / 2) / this.componentRef.directiveRef.ace().renderer.lineHeight;
    this.componentRef.directiveRef.ace().getSession().foldAll();
  }

  formIsValid() {
    return this.form.valid;
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.value.Script = this.componentRef.directiveRef.ace().getValue();
      this.dialogRef.close(this.form.value);
    }
    else {
      this.snackBar.open('Data is not valid. ', '', { duration: 5000 });
    }
  }
}
