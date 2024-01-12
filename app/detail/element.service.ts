import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeyValue } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

  constructor(private snackBar: MatSnackBar,
    private httpClient: HttpClient) { }

  getElements(TabID: number, queryParameters?: KeyValue<string, any>[]) {
    var queryString = '';
    if (typeof (queryParameters) != 'undefined') {
      queryParameters.forEach(paramObj => {
        queryString += (queryString.length ? '&' : '?') + paramObj.key + '=' + paramObj.value;
      });
    }

    if (typeof (TabID) == 'undefined') {
      return this.httpClient.get(environment.API_URL + 'Elements' + queryString);
    } else {
      return this.httpClient.get(environment.API_URL + 'Tabs/' + TabID + '/Elements' + queryString);
    }
  }

  getElement(ElementId) {
    return this.httpClient.get(`${environment.API_URL + 'Elements'}/${ElementId}`);
  }

  createElement(Element) {
    return this.httpClient.post(`${environment.API_URL + 'Elements'}`, JSON.stringify(Element))
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

  updateElement(ElementId, Element) {
    return this.httpClient.put(`${environment.API_URL + 'Elements'}/${ElementId}`, JSON.stringify(Element))
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

  deleteElement(ElementId) {
    return this.httpClient.delete(`${environment.API_URL + 'Elements'}/${ElementId}`)
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
