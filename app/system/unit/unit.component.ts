import { Component, OnInit, Inject, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Unit } from "../unit";

@Component({
  selector: 'dmz-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UnitComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Unit) {

    // Undefined when creating a new User
    if (data == undefined) {
      data = new Unit();
    }

    // Initialise the form
    this.form = fb.group({
      UnitID: [data.UnitID],
      Name: [data.Name, Validators.compose([Validators.required, Validators.minLength(8)])],
      Minimum: [data.Minimum],
      Maximum: [data.Maximum],
      RetentionDays: [data.RetentionDays],
      RetentionInterval: [data.RetentionInterval],
      IconList: [data.IconList],
      TextLabels: [data.TextLabels]
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
