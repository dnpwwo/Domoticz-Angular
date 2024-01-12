import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TableAccessService {

  constructor(private snackBar: MatSnackBar,
              private httpClient: HttpClient) { }

  getTableAccesss(RoleID) {
    if (typeof (RoleID) == 'undefined') {
      return this.httpClient.get(environment.API_URL + 'TableAccesss');
    } else {
      return this.httpClient.get(environment.API_URL + 'Roles/' + RoleID + '/TableAccesss');
    }
  }

  getTableAccess(TableAccessId) {
    return this.httpClient.get(`${environment.API_URL + 'TableAccess'}/${TableAccessId}`);
  }

  createTableAccess(TableAccess) {
    return this.httpClient.post(`${environment.API_URL + 'TableAccesss'}`, JSON.stringify(TableAccess))
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

  updateTableAccess(TableAccessId, TableAccess) {
    return this.httpClient.put(`${environment.API_URL + 'TableAccesss'}/${TableAccessId}`, JSON.stringify(TableAccess))
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

  deleteTableAccess(TableAccessId) {
    return this.httpClient.delete(`${environment.API_URL + 'TableAccesss'}/${TableAccessId}`)
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
