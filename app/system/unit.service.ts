import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private snackBar: MatSnackBar,
              private httpClient: HttpClient) { }

  getUnits() {
    return this.httpClient.get(environment.API_URL + 'Units')
  }

  getUnit(UnitId) {
    return this.httpClient.get(`${environment.API_URL + 'Units'}/${UnitId}`);
  }

  createUnit(Unit) {
    return this.httpClient.post(`${environment.API_URL + 'Units'}`, JSON.stringify(Unit))
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

  updateUnit(UnitId, Unit) {
    return this.httpClient.put(`${environment.API_URL + 'Units'}/${UnitId}`, JSON.stringify(Unit))
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

  deleteUnit(UnitId) {
    return this.httpClient.delete(`${environment.API_URL + 'Units'}/${UnitId}`)
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
