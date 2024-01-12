import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(private snackBar: MatSnackBar,
              private httpClient: HttpClient) { }

  getPreferences() {
    return this.httpClient.get(environment.API_URL + 'Preferences')
  }

  getPreference(PreferenceId) {
    return this.httpClient.get(`${environment.API_URL + 'Preferences'}/${PreferenceId}`);
  }

  createPreference(Preference) {
    return this.httpClient.post(`${environment.API_URL + 'Preferences'}`, JSON.stringify(Preference))
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

  updatePreference(PreferenceId, Preference) {
    return this.httpClient.put(`${environment.API_URL + 'Preferences'}/${PreferenceId}`, JSON.stringify(Preference))
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

  deletePreference(PreferenceId) {
    return this.httpClient.delete(`${environment.API_URL + 'Preferences'}/${PreferenceId}`)
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

