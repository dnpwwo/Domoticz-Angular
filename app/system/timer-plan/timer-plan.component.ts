import { Component, OnInit, Inject, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimerPlan } from "../timer-plan";

@Component({
  selector: 'dmz-timer-plan',
  templateUrl: './timer-plan.component.html',
  styleUrls: ['./timer-plan.component.css']
})
export class TimerPlanComponent implements OnInit {

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TimerPlanComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: TimerPlan) {

    // Undefined when creating a new User
    if (data == undefined) {
      data = new TimerPlan();
    }

    // Initialise the form
    this.form = fb.group({
      TimerPlanID: [data.TimerPlanID],
      Name: [data.Name, Validators.compose([Validators.required, Validators.minLength(4)])],
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
