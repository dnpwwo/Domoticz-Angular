import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { InterfaceLog } from "src/app/hardware/interface-log";

export class InterfaceLogListWatcherService extends SharedWebSocketService<InterfaceLog> {

  constructor(private fConnect: () => void,
    private fGetItems: () => InterfaceLog[],
    private fDisconnect: () => void,
    private InterfaceID: number = 0) {
    super("InterfaceLogs", fConnect, fGetItems, fDisconnect);
  }
  getName(item: InterfaceLog) { return 'Log item'; }
  getID(item: InterfaceLog) { return item.InterfaceLogID; }

  isRelevant(item: InterfaceLog) {
    if ((this.InterfaceID == 0) || (this.InterfaceID == item.InterfaceID)) {
      return true;
    }
    return false;
  }
}
