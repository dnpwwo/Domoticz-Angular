import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { Interface } from "src/app/hardware/interface";

export class InterfaceListWatcherService extends SharedWebSocketService<Interface> {

  constructor(private fConnect: () => void,
    private fGetItems: () => Interface[],
    private fDisconnect: () => void) {
    super("Interfaces", fConnect, fGetItems, fDisconnect);
  }
  getName(item: Interface) { return "'" + item.Name + "'"; }
  getID(item: Interface) { return item.InterfaceID; }
}
