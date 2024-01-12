import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeyValue } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private snackBar: MatSnackBar,
              private httpClient: HttpClient) { }

  getLayouts(queryParameters?: KeyValue<string, any>[]) {
    var queryString = '';
    if (typeof (queryParameters) != 'undefined') {
      queryParameters.forEach(paramObj => {
        queryString += (queryString.length ? '&' : '?') + paramObj.key + '=' + paramObj.value;
      });
    }
    return this.httpClient.get(environment.API_URL + 'Layouts' + queryString);
  }

  getLayout(LayoutId) {
    return this.httpClient.get(`${environment.API_URL + 'Layouts'}/${LayoutId}`);
  }

  createLayout(Layout) {
    return this.httpClient.post(`${environment.API_URL + 'Layouts'}`, JSON.stringify(Layout))
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

  updateLayout(LayoutId, Layout) {
    return this.httpClient.put(`${environment.API_URL + 'Layouts'}/${LayoutId}`, JSON.stringify(Layout))
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

  deleteLayout(LayoutId) {
    return this.httpClient.delete(`${environment.API_URL + 'Layouts'}/${LayoutId}`)
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
