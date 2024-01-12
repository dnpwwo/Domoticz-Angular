import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ValueTimerService {

  constructor(private snackBar: MatSnackBar,
    private httpClient: HttpClient) { }

  getValueTimers(ValueTimerId) {
    if (typeof (ValueTimerId) == 'undefined') {
      return this.httpClient.get(environment.API_URL + 'ValueTimers')
    } else {
      return this.httpClient.get(environment.API_URL + 'Values/' + ValueTimerId + '/ValueTimers');
    }
  }

  getValueTimer(ValueTimerId) {
    return this.httpClient.get(`${environment.API_URL + 'ValueTimers'}/${ValueTimerId}`);
  }

  createValueTimer(ValueTimer) {
    return this.httpClient.post(`${environment.API_URL + 'ValueTimers'}`, JSON.stringify(ValueTimer))
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

  updateValueTimer(ValueTimerId, ValueTimer) {
    return this.httpClient.put(`${environment.API_URL + 'ValueTimers'}/${ValueTimerId}`, JSON.stringify(ValueTimer))
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

  deleteValueTimer(ValueTimerId) {
    return this.httpClient.delete(`${environment.API_URL + 'ValueTimers'}/${ValueTimerId}`)
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
