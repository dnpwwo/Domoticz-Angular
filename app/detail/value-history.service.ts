import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValueHistoryService {

  constructor(private httpClient: HttpClient) { }

  getValueHistorys(ValueID) {
    if (typeof (ValueID) == 'undefined') {
      return this.httpClient.get(environment.API_URL + 'ValueHistorys');
    } else {
      return this.httpClient.get(environment.API_URL + 'Values/' + ValueID + '/ValueHistorys');
    }
  }

  getValueHistory(ValueId) {
    return this.httpClient.get(`${environment.API_URL + 'ValueHistorys'}/${ValueId}`);
  }
}
