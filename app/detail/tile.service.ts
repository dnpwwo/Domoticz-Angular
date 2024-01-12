import { Injectable } from '@angular/core';
import { KeyValue } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TileService {

  constructor(private snackBar: MatSnackBar,
    private httpClient: HttpClient) { }

  getTiles(TabID: number, queryParameters?: KeyValue<string, any>[]) {
    var queryString = '';
    if (typeof (queryParameters) != 'undefined') {
      queryParameters.forEach(paramObj => {
        queryString += (queryString.length ? '&' : '?') + paramObj.key + '=' + paramObj.value;
      });
    }

    if (typeof (TabID) == 'undefined') {
      return this.httpClient.get(environment.API_URL + 'Tiles' + queryString);
    } else {
      return this.httpClient.get(environment.API_URL + 'Tabs/' + TabID + '/Tiles' + queryString);
    }
  }

  getTile(TileId) {
    return this.httpClient.get(`${environment.API_URL + 'Tiles'}/${TileId}`);
  }

  createTile(Tile) {
    return this.httpClient.post(`${environment.API_URL + 'Tiles'}`, JSON.stringify(Tile))
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

  updateTile(TileId, Tile) {
    return this.httpClient.put(`${environment.API_URL + 'Tiles'}/${TileId}`, JSON.stringify(Tile))
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

  deleteTile(TileId) {
    return this.httpClient.delete(`${environment.API_URL + 'Tiles'}/${TileId}`)
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
