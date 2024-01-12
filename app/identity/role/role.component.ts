import { Component, OnInit, Inject, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from "../role";

@Component({
  selector: 'dmz-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RoleComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Role) {

    // Undefined when creating a new User
    if (data == undefined) {
      data = new Role();
    }

    // Initialise the form
    this.form = fb.group({
      RoleID: [data.RoleID],
      Name: [data.Name, Validators.compose([Validators.required, Validators.minLength(8)])],
      RemoteAccess: [data.RemoteAccess],
      InternalTTL: [data.InternalTTL],
      RemoteTTL: [data.RemoteTTL]
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
