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
import { ValueTimer } from "../value-timer";

import { Value, ValueMessage, ValuesMessage } from "src/app/detail/value";
import { ValueService } from "src/app/detail/value.service";
import { TimerPlan, TimerPlansMessage } from "src/app/system/timer-plan";
import { TimerPlanService } from "src/app/system/timer-plan.service";


@Component({
  selector: 'dmz-value-timer',
  templateUrl: './value-timer.component.html',
  styleUrls: ['./value-timer.component.css']
})
export class ValueTimerComponent implements OnInit {

  timerPlans: TimerPlan[];
  values: Value[];
  form: FormGroup;

  timerTypes: string[] = ['Daily', 'Event', 'Periodic', 'Change'];
  isLoading: Boolean = true;

  public aceContent: string = '';
  public aceConfig: AceConfigInterface = {
    mode: 'python',
    theme: 'xcode',
    readOnly: false,
    tabSize: 4,
    minLines: 45
  };

  @ViewChild(AceComponent) componentRef?: AceComponent;

  constructor(
    private timerPlanService: TimerPlanService,
    private valueService: ValueService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ValueTimerComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ValueTimer) {

    // Undefined when creating a new User
    if (data == undefined) {
      data = new ValueTimer();
    }

    // Initialise the form
    this.form = fb.group({
      ValueTimerID: [data.ValueTimerID],
      Name: [data.Name, Validators.compose([Validators.required, Validators.minLength(4)])],
      TimerPlanID: [data.TimerPlanID, Validators.compose([Validators.required, Validators.min(1)])],
      ValueID: [data.ValueID, Validators.compose([Validators.required, Validators.min(1)])],
      DayMask: [data.DayMask, Validators.compose([Validators.required, Validators.minLength(3)])],
      Sunday: [data.DayMask.indexOf('Sun') != -1],
      Monday: [data.DayMask.indexOf('Mon') != -1],
      Tuesday: [data.DayMask.indexOf('Tue') != -1],
      Wednesday: [data.DayMask.indexOf('Wed') != -1],
      Thursday: [data.DayMask.indexOf('Thu') != -1],
      Friday: [data.DayMask.indexOf('Fri') != -1],
      Saturday: [data.DayMask.indexOf('Sat') != -1],
      Type: [(data.Type.length > 0) ? data.Type : this.timerTypes[0]],
      RunTime: [data.RunTime, Validators.compose([Validators.pattern(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/)])],
      Sunrise: [data.Sunrise],
      Sunset: [data.Sunset],
      Frequency: [data.Frequency, Validators.compose([Validators.required, Validators.min(0), Validators.max(1200)])],
      Random: [data.Random, Validators.compose([Validators.required, Validators.min(0), Validators.max(60)])],
      Script: [data.Script],
    }, {
        validators: [this.conditionalValidator]
    });
    this.aceContent = data.Script;

    this.timerPlanService.getTimerPlans().subscribe((TimerPlansMsg: TimerPlansMessage) => {
      if (TimerPlansMsg != undefined) {
        this.timerPlans = TimerPlansMsg.TimerPlans;
      }
    })
    this.valueService.getValue(data.ValueID).subscribe((ValueMsg: ValueMessage) => {
      this.valueService.getValues(ValueMsg.Value[0].DeviceID).subscribe((ValuesMsg: ValuesMessage) => {
        this.values = ValuesMsg.Values;
      })
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // To get the Ace instance:
    // this.componentRef.directiveRef.ace();
    this.aceConfig.maxLines = (window.innerHeight / 2) / this.componentRef.directiveRef.ace().renderer.lineHeight;
    this.componentRef.directiveRef.ace().getSession().foldAll();

    // Enable and disable form control based on type
    this.form.get('Type').valueChanges.subscribe(selectedValue => { this.onTimerType(); });

    // Handle changes to days of week to keep DayMask correct
    this.form.get('Sunday').valueChanges.subscribe(selectedValue => { this.onDayOfWeek(); });
    this.form.get('Monday').valueChanges.subscribe(selectedValue => { this.onDayOfWeek(); });
    this.form.get('Tuesday').valueChanges.subscribe(selectedValue => { this.onDayOfWeek(); });
    this.form.get('Wednesday').valueChanges.subscribe(selectedValue => { this.onDayOfWeek(); });
    this.form.get('Thursday').valueChanges.subscribe(selectedValue => { this.onDayOfWeek(); });
    this.form.get('Friday').valueChanges.subscribe(selectedValue => { this.onDayOfWeek(); });
    this.form.get('Saturday').valueChanges.subscribe(selectedValue => { this.onDayOfWeek(); });
  }

  conditionalValidator(formGroup: FormGroup) {
    // return of null == no issues


    //if (formGroup.value.myCheckbox) {
    //  return Validators.required(formGroup.get('myEmailField')) ? {
    //    myEmailFieldConditionallyRequired: true,
    //  } : null;
    //}
    return null;
  }

  onSubmit() {
    debugger;
    if (this.form.valid) {
      this.form.value.Script = this.componentRef.directiveRef.ace().getValue();
      this.dialogRef.close(this.form.value);
    }
    else {
      this.snackBar.open('Data is not valid. ', '', { duration: 5000 });
    }
  }

  onDayOfWeek() {
    var DayMask: string = "";
    if (this.form.controls['Sunday'].value) { (DayMask.length) ? DayMask += ",Sun" : DayMask += "Sun"; }
    if (this.form.controls['Monday'].value) { (DayMask.length) ? DayMask += ",Mon" : DayMask += "Mon"; }
    if (this.form.controls['Tuesday'].value) { (DayMask.length) ? DayMask += ",Tue" : DayMask += "Tue"; }
    if (this.form.controls['Wednesday'].value) { (DayMask.length) ? DayMask += ",Wed" : DayMask += "Wed"; }
    if (this.form.controls['Thursday'].value) { (DayMask.length) ? DayMask += ",Thu" : DayMask += "Thu"; }
    if (this.form.controls['Friday'].value) { (DayMask.length) ? DayMask += ",Fri" : DayMask += "Fri"; }
    if (this.form.controls['Saturday'].value) { (DayMask.length) ? DayMask += ",Sat" : DayMask += "Sat"; }
    this.form.controls['DayMask'].setValue(DayMask);
    //this.snackBar.open(DayMask, '', { duration: 1000 });

  }

  onTimerType() {
    this.form.get('RunTime').disable();
    this.form.get('Sunrise').disable();
    this.form.get('Sunset').disable();
    this.form.get('Frequency').disable();

    switch (this.form.controls['Type'].value) {
      case 'Daily': {
        this.form.get('RunTime').enable();
        this.form.controls['Sunrise'].setValue(false);
        this.form.controls['Sunset'].setValue(false);
        this.form.controls['Frequency'].setValue(0);
        break;
      }
      case 'Event': {
        this.form.controls['RunTime'].setValue("00:00:00");
        this.form.get('Sunrise').enable();
        this.form.get('Sunset').enable();
        this.form.controls['Frequency'].setValue(0);
        break;
      }
      case 'Periodic': {
        this.form.controls['RunTime'].setValue("00:00:00");
        this.form.controls['Sunrise'].setValue(false);
        this.form.controls['Sunset'].setValue(false);
        this.form.get('Frequency').enable();
        break;
      }
      default: {
        this.form.controls['RunTime'].setValue("00:00:00");
        this.form.controls['Sunrise'].setValue(false);
        this.form.controls['Sunset'].setValue(false);
        this.form.controls['Frequency'].setValue(0);
      }
    }
  }

  formIsValid() {
    if (this.isLoading) {
      this.onTimerType();
      this.isLoading = false;
    }
    return this.form.valid;
  }

  // Required to make the Select control work
  compareTimerPlanObjects(timerPlan: TimerPlan, index: number) {
    return timerPlan && index && (timerPlan.TimerPlanID == index);
  }
  compareValueObjects(value: Value, index: number) {
    return value && index && (value.ValueID == index);
  }
}
