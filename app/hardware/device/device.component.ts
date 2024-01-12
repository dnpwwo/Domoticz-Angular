import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Device } from "../device";

import { Interface, InterfacesMessage } from "../interface";
import { InterfaceService } from "../interface.service";

@Component({
  selector: 'dmz-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  interfaces: Interface[];
  form: FormGroup;

  constructor(
    private interfaceService: InterfaceService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DeviceComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Device) {

    // Undefined when creating a new User
    if (data == undefined) {
      data = new Device();
    }

    // Initialise the form
    this.form = fb.group({
      DeviceID: [data.DeviceID],
      InterfaceID: [data.InterfaceID, Validators.compose([Validators.required, Validators.min(1)])],
      Name: [data.Name, Validators.compose([Validators.required, Validators.minLength(4)])],
      InternalID: [data.InternalID],
      Address: [data.Address],
      Debug: [data.Debug],
      Enabled: [data.Enabled],
      Active: [data.Active],
      Timestamp: [data.Timestamp],
    });

    this.interfaceService.getInterfaces().subscribe((InterfacesMsg: InterfacesMessage) => {
      this.interfaces = InterfacesMsg.Interfaces;
    })
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

  // Required to make the Select control work
  compareInterfaceObjects(iface: Interface, index: number) {
    return iface && index && (iface.InterfaceID == index);
  }
}
