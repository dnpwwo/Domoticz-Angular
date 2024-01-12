import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableAccess } from "../table-access";

import { Role, RolesMessage } from "../role";
import { RoleService } from "../role.service";

@Component({
  selector: 'dmz-table-access',
  templateUrl: './table-access.component.html',
  styleUrls: ['./table-access.component.css']
})
export class TableAccessComponent implements OnInit {

  roles: Role[];
  form: FormGroup;

  constructor(
    private roleService: RoleService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TableAccessComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: TableAccess) {

    // Undefined when creating a new User
    if (data == undefined) {
      data = new TableAccess();
    }

    // Initialise the form
    this.form = fb.group({
      TableAccessID: [data.TableAccessID],
      Name: [data.Name, Validators.compose([Validators.required, Validators.minLength(4)])],
      RoleID: [data.RoleID, Validators.required],
      CanGET: [Number(data.CanGET)],
      CanPOST: [Number(data.CanPOST)],
      CanPUT: [Number(data.CanPUT)],
      CanPATCH: [Number(data.CanPATCH)],
      CanDELETE: [Number(data.CanDELETE)],
      DontGETFields: [data.DontGETFields],
      PUTFields: [data.PUTFields],
      PATCHFields: [data.PATCHFields]
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
  compareRoleObjects(role: Role, index: number) {
    return role && index && (role.RoleID == index);
  }
}
