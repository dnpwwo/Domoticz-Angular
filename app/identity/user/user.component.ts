import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from "../user";

import { Role, RolesMessage } from "../role";
import { RoleService } from "../role.service";

interface Theme {
  Name: string;
  Value: string;
}

@Component({
  selector: 'dmz-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  roles: Role[];
  form: FormGroup;
  themes: Theme[] = [
    { Name: 'Indigo', Value: 'indigo' },
    { Name: 'Deep Purple', Value: 'deep-purple' },
    { Name: 'Pink (Dark)', Value: 'pink' },
    { Name: 'Purple (Dark)', Value: 'purple' },
    { Name: 'Yellow (Dark)', Value: 'yellow' }
  ];

  constructor(
    private roleService: RoleService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: User) {

    // Undefined when creating a new User
    if (data == undefined) {
      data = new User();
    }

    // Initialise the form
    this.form = fb.group({
      UserID: [data.UserID],
      UserName: [data.UserName, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      RoleID: [data.RoleID, Validators.required],
      Name: [data.Name, Validators.compose([Validators.required, Validators.minLength(4)])],
      Password: [data.Password, Validators.compose([Validators.required, Validators.minLength(8)])],
      Password2: [data.Password, Validators.compose([Validators.required, Validators.minLength(8)])],
      Active: [data.Active],
      ForceChange: [data.ForceChange],
      FailedAttempts: [data.FailedAttempts],
      Theme: [data.Theme],
      EmailAddress: [data.EmailAddress],
      MobileNumber: [data.MobileNumber],
      Timestamp: [data.Timestamp],
    });

    this.roleService.getRoles().subscribe((RolesMsg: RolesMessage) => {
      // This sets the Options in the Select control
      this.roles = RolesMsg.Roles;
    })
  }

  ngOnInit() {
   }

  onSubmit() {
    if (this.form.valid) {
      delete this.form.value.Password2;
      this.dialogRef.close(this.form.value);
    }
    else {
      this.snackBar.open('Data is not valid. ', '', { duration: 5000 });
    }
  }

  formIsValid() {
    return this.form.valid && (this.form.value.Password == this.form.value.Password2);
  }

// Required to make the Select control work
  compareRoleObjects(role: Role, index: number) {
    return role && index && (role.RoleID == index);
  }
}
