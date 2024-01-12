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
import { Value } from "../value";

import { Device, DeviceMessage, DevicesMessage } from "src/app/hardware/device";
import { DeviceService } from "src/app/hardware/device.service";
import { Unit, UnitsMessage } from "src/app/system/unit";
import { UnitService } from "src/app/system/unit.service";


@Component({
  selector: 'dmz-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  units: Unit[];
  devices: Device[];
  form: FormGroup;

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
    private unitService: UnitService,
    private deviceService: DeviceService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ValueComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Value) {

    // Undefined when creating a new User
    if (data == undefined) {
      data = new Value();
    }

    // Initialise the form
    this.form = fb.group({
      ValueID: [data.ValueID],
      Name: [data.Name, Validators.compose([Validators.required, Validators.minLength(4)])],
      InternalID: [data.InternalID],
      DeviceID: [data.DeviceID, Validators.compose([Validators.required, Validators.min(1)])],
      UnitID: [data.UnitID, Validators.compose([Validators.required, Validators.min(1)])],
      Value: [data.Value],
      RetentionDays: [data.RetentionDays],
      RetentionInterval: [data.RetentionInterval],
      UpdateScript: [data.UpdateScript],
      Debug: [data.Debug],
      Timestamp: [data.Timestamp],
    });
    this.aceContent = data.UpdateScript;

    this.unitService.getUnits().subscribe((UnitsMsg: UnitsMessage) => {
      this.units = UnitsMsg.Units;
    })
    this.deviceService.getDevice(data.DeviceID).subscribe((DeviceMsg: DeviceMessage) => {
      this.deviceService.getDevices(DeviceMsg.Device.InterfaceID).subscribe((DevicesMsg: DevicesMessage) => {
        this.devices = DevicesMsg.Devices;
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
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.value.UpdateScript = this.componentRef.directiveRef.ace().getValue();
      this.dialogRef.close(this.form.value);
    }
    else {
      this.snackBar.open('Data is not valid. ', '', { duration: 5000 });
    }
  }

  formIsValid() {
    return this.form.valid;
  }

// Required to make the Select control work
  compareUnitObjects(unit: Unit, index: number) {
    return unit && index && (unit.UnitID == index);
  }
  compareDeviceObjects(device: Device, index: number) {
    return device && index && (device.DeviceID == index);
  }
}
