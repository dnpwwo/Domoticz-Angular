/*
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardWatcherService {

  constructor() { }
}
*/
import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { Tab } from "src/app/detail/tab";
import { Tile } from "src/app/detail/tile";
import { Value } from "src/app/detail/value";

export class DashboardWatcherService extends SharedWebSocketService<Tab> {

  constructor(private fConnect: () => void,
    private fGetItems: () => any[],
    private fDisconnect: () => void) {
    super("Tabs,Tiles,Values", fConnect, fGetItems, fDisconnect);
  }
  getName(item: any) { return "'" + item.Name + "'"; }
  getID(item: any) { return item.TabID; }
}
