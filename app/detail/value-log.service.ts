import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValueLogService {

  constructor(private httpClient: HttpClient) { }

  getValueLogs(ValueID) {
    if (typeof (ValueID) == 'undefined') {
      return this.httpClient.get(environment.API_URL + 'ValueLogs');
    } else {
      return this.httpClient.get(environment.API_URL + 'Values/' + ValueID + '/ValueLogs');
    }
  }

  getValueLog(ValueId) {
    return this.httpClient.get(`${environment.API_URL + 'ValueLogs'}/${ValueId}`);
  }
}
