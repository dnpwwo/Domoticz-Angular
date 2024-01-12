import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterfaceLogService {

  constructor(private httpClient: HttpClient) { }

  getInterfaceLogs(InterfaceID) {
    if (typeof (InterfaceID) == 'undefined') {
      return this.httpClient.get(environment.API_URL + 'InterfaceLogs');
    } else {
      return this.httpClient.get(environment.API_URL + 'Interfaces/' + InterfaceID + '/InterfaceLogs');
    }
  }

  getInterfaceLog(InterfaceId) {
    return this.httpClient.get(`${environment.API_URL + 'InterfaceLogs'}/${InterfaceId}`);
  }
}
