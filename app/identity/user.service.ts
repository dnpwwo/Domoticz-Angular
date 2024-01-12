import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private snackBar: MatSnackBar,
              private httpClient: HttpClient) { }

  getUsers(RoleID) {
    if (typeof (RoleID) == 'undefined') {
      return this.httpClient.get(environment.API_URL + 'Users');
    } else {
      return this.httpClient.get(environment.API_URL + 'Roles/' + RoleID + '/Users');
    }
  }

  getUser(UserId) {
    return this.httpClient.get(`${environment.API_URL + 'Users'}/${UserId}`);
  }

  createUser(User) {
    return this.httpClient.post(`${environment.API_URL + 'Users'}`, JSON.stringify(User))
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

  updateUser(UserId, User) {
    return this.httpClient.put(`${environment.API_URL + 'Users'}/${UserId}`, JSON.stringify(User))
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

  deleteUser(UserId) {
    return this.httpClient.delete(`${environment.API_URL + 'Users'}/${UserId}`)
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
