import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { timer } from 'rxjs';

export class SharedWebSocketService<T> {

  private targetName: string;
  private bSubscribed: boolean;

  private WsSubject: WebSocketSubject<any> = webSocket({
    url: environment.WS_Protocol + window.location.hostname + ":" + (environment.WS_Port != "" ? environment.WS_Port : window.location.port) + environment.WS_URL,
    protocol: environment.WS_SecProtocol,
    openObserver: {
      next: () => {
        console.log(this.targetName + " SharedWebSocket opened.");
        this.funcConnect();
      }
    },
    closeObserver: {
      next: (closeEvent) => {
        this.funcDisconnect();
        console.log(this.targetName + " SharedWebSocket closed.");
      }
    }
  });

  private WsObservable = this.WsSubject.multiplex(
    () => {
      console.log("SharedWebSocket subscribed to: " + this.targetName);
      this.bSubscribed = true;
      return { subscribe: this.targetName }
    },
    () => {
      console.log("SharedWebSocket unsubscribed from: " + this.targetName);
      this.bSubscribed = false;
      return { unsubscribe: this.targetName }
    },
    messageFilter => { return (this.targetName in <any>messageFilter); }
  );


  constructor(private target: string,
    private funcConnect: () => void,
    protected funcGetItems: () => T[],
    private funcDisconnect: () => void) {

    this.targetName = target;
    this.bSubscribed = false;

  }

  subscribe(Next: (value: T[], reason: string) => void, Error?: (error: any) => void, Complete?: () => void): any {
        
    return this.WsObservable.subscribe(
      next => {
        if ((this.targetName in next) && (this.isRelevant(next[this.targetName][0]))) {
          console.log(next)
          if (typeof (next) != "undefined") {
            let bHandled = false;
            var aValues: T[] = [];
            let sReason = "Unknown update to " + this.targetName;
            let iChangedID = this.getID(next[this.targetName][0]);
            this.funcGetItems().forEach((item) => {
              let itemID = this.getID(item);
              // Handle delete
              if (itemID == iChangedID * -1) {
                sReason = this.getName(item) + " deleted.";
                bHandled = true;
              }
              // Handle update
              else if (itemID == iChangedID) {
                aValues.push(next[this.targetName][0]);
                sReason = this.getName(next[this.targetName][0]) + " updated.";
                bHandled = true;
              }
              else {
                aValues.push(item);
              }
            });
            // Handle insert
            if (!bHandled) {
              aValues.push(next[this.targetName][0]);
              sReason = this.getName(next[this.targetName][0]) + " added.";
            }

            // inform list component
            Next(aValues, sReason);
          }
        }
      },
      error =>  { (typeof (Error) != "undefined") ? Error(error) : this.error(error); },
      () => { if (typeof (Complete) != "undefined") { Complete; }; }
    );
  }

  error(error) {
    if (typeof (error.type) == "undefined") {
      console.log(this.targetName + " SharedWebSocket error:" + error.message);
    }
    else {
      if (error.type != 'close') {
        console.log(this.targetName + " SharedWebSocket error:" + error.type);
      } else {
        console.log(this.targetName + " SharedWebSocket closed.")
      }
    }
  }

  isRelevant(item: T) {
    return true;
  }

  getName(item: T) {
    console.log("ERROR: SharedWebSocketService Base 'getName' function called.");
    return "";
  }

  getID(item: T) {
    console.log("ERROR: SharedWebSocketService Base 'getID' function called.");
    return -1;
  }
}
