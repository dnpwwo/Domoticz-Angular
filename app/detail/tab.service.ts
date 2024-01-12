import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { KeyValue } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tab, TabsMessage } from "src/app/detail/tab";

@Injectable({
  providedIn: 'root'
})
export class TabService {

  constructor(private snackBar: MatSnackBar,
              private httpClient: HttpClient) { }

  getTabs(LayoutID?: number, queryParameters?: KeyValue<string, any>[]) {
    var queryString = '';
    if (typeof (queryParameters) != 'undefined') {
      queryParameters.forEach(paramObj => {
        queryString += (queryString.length ? '&' : '?') + paramObj.key + '=' + paramObj.value;
      });
    }

    if (typeof (LayoutID) == 'undefined') {
      return this.httpClient.get(environment.API_URL + 'Tabs' + queryString);
    } else {
      return this.httpClient.get(environment.API_URL + 'Layouts/' + LayoutID + '/Tabs' + queryString);
    }
  }

  getTab(TabId) {
    return this.httpClient.get(`${environment.API_URL + 'Tabs'}/${TabId}`);
  }

  createTab(Tab) {
    return this.httpClient.post(`${environment.API_URL + 'Tabs'}`, JSON.stringify(Tab))
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

  updateTab(TabId, Tab) {
    return this.httpClient.put(`${environment.API_URL + 'Tabs'}/${TabId}`, JSON.stringify(Tab))
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

  deleteTab(TabId) {
    return this.httpClient.delete(`${environment.API_URL + 'Tabs'}/${TabId}`)
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

  // Specific functionality to support the Dashboard
  public tabs: Tab[] = [];
  public tabSub = new BehaviorSubject<Tab[]>(this.tabs);

  getInitialiseTabs(LayoutID: number, queryParameters?: KeyValue<string, any>[]): TabsMessage {
    var retMsg: TabsMessage = <TabsMessage><unknown>this.getTabs(LayoutID, queryParameters);
    this.tabs = retMsg.Tabs;
    return retMsg;
  }

  public addTab(tab: Tab) {
    this.tabs.push(tab);
    this.tabSub.next(this.tabs);
  }

  public removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.tabSub.next(this.tabs);
  }
}
