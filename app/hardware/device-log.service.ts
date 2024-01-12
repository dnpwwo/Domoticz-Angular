import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceLogService {

  constructor(private httpClient: HttpClient) { }

  getDeviceLogs(DeviceID) {
    if (typeof (DeviceID) == 'undefined') {
      return this.httpClient.get(environment.API_URL + 'DeviceLogs');
    } else {
      return this.httpClient.get(environment.API_URL + 'Devices/' + DeviceID + '/DeviceLogs');
    }
  }

  getDeviceLog(DeviceId) {
    return this.httpClient.get(`${environment.API_URL + 'DeviceLogs'}/${DeviceId}`);
  }
}
