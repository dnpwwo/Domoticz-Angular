import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  constructor(private snackBar: MatSnackBar,
              private httpClient: HttpClient) { }

  getValues(DeviceID) {
    if (typeof (DeviceID) == 'undefined') {
      return this.httpClient.get(environment.API_URL + 'Values');
    } else {
      return this.httpClient.get(environment.API_URL + 'Devices/' + DeviceID + '/Values');
    }
  }

  getValue(ValueID) {
    return this.httpClient.get(`${environment.API_URL + 'Values'}/${ValueID}`);
  }

  createValue(Value) {
    return this.httpClient.post(`${environment.API_URL + 'Values'}`, JSON.stringify(Value))
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

  updateValue(ValueId, Value) {
    return this.httpClient.put(`${environment.API_URL + 'Values'}/${ValueId}`, JSON.stringify(Value))
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

  deleteValue(ValueId) {
    return this.httpClient.delete(`${environment.API_URL + 'Values'}/${ValueId}`)
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
