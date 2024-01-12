import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Preference } from "../preference";

@Component({
  selector: 'dmz-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent implements OnInit {

  form: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PreferenceComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Preference) {

    // Undefined when creating a new User
    if (data == undefined) {
      data = new Preference();
    }

    // Initialise the form
    this.form = fb.group({
      RoleID: [data.PreferenceID],
      Name: [data.Name, Validators.compose([Validators.required, Validators.minLength(8)])],
      Value: [data.Value, Validators.required]
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
