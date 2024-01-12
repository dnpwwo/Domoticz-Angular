import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private snackBar: MatSnackBar,
              private httpClient: HttpClient) { }

  getRoles() {
    return this.httpClient.get(environment.API_URL + 'Roles')
  }

  getRole(RoleId) {
    return this.httpClient.get(`${environment.API_URL + 'Roles'}/${RoleId}`);
  }

  createRole(Role) {
    return this.httpClient.post(`${environment.API_URL + 'Roles'}`, JSON.stringify(Role))
      .subscribe(
        (val) => {
          console.log("POST call successful value: ", val);
        },
        response => {
          console.log("POST call in error", response);
          this.snackBar.open(response.message, '', { duration: 5000 });
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  updateRole(RoleId, Role) {
    return this.httpClient.put(`${environment.API_URL + 'Roles'}/${RoleId}`, JSON.stringify(Role))
      .subscribe(
        (val) => {
          console.log("PUT call successful value: ", val);
        },
        response => {
          console.log("PUT call in error", response);
          this.snackBar.open(response.message, '', { duration: 5000 });
        },
        () => {
          console.log("The PUT observable is now completed.");
        });
  }

  deleteRole(RoleId) {
    return this.httpClient.delete(`${environment.API_URL + 'Roles'}/${RoleId}`)
      .subscribe(
        (val) => {
          console.log("DELETE call successful value: ", val);
        },
        response => {
          console.log("DELETE call in error", response);
          this.snackBar.open(response.message, '', { duration: 5000 });
        },
        () => {
          console.log("The DELETE observable is now completed.");
        });
  }
}
