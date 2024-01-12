import { Component, OnInit, Inject, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Layout } from "../layout";

@Component({
  selector: 'dmz-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LayoutComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Layout) {

    // Undefined when creating a new User
    if (data == undefined) {
      data = new Layout();
    }

    // Initialise the form
    this.form = fb.group({
      LayoutID: [data.LayoutID],
      Name: [data.Name, Validators.compose([Validators.required, Validators.minLength(8)])],
      MinimumWidth: [data.MinimumWidth],
      Active: [data.Active]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
    else {
      this.snackBar.open('Data is not valid. ', '', { duration: 5000 });
    }
  }

  formIsValid() {
    return this.form.valid;
  }
}
