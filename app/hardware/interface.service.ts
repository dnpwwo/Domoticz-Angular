import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  constructor(private snackBar: MatSnackBar,
              private httpClient: HttpClient) { }

  getInterfaces() {
    return this.httpClient.get(environment.API_URL + 'Interfaces')
  }

  getInterface(InterfaceId) {
    return this.httpClient.get(`${environment.API_URL + 'Interfaces'}/${InterfaceId}`);
  }

  createInterface(Interface) {
    return this.httpClient.post(`${environment.API_URL + 'Interfaces'}`, JSON.stringify(Interface))
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

  updateInterface(InterfaceId, Interface) {
    return this.httpClient.put(`${environment.API_URL + 'Interfaces'}/${InterfaceId}`, JSON.stringify(Interface))
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

  deleteInterface(InterfaceId) {
    return this.httpClient.delete(`${environment.API_URL + 'Interfaces'}/${InterfaceId}`)
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
