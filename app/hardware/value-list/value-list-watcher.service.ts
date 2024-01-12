import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { Value } from "src/app/detail/value";

export class ValueListWatcherService extends SharedWebSocketService<Value> {

  constructor(private fConnect: () => void,
    private fGetItems: () => Value[],
    private fDisconnect: () => void,
    private DeviceID: number = 0) {
    super("Values", fConnect, fGetItems, fDisconnect);
  }
  getName(item: Value) { return "'" + item.Name + "'"; }
  getID(item: Value) { return item.ValueID; }

  isRelevant(item: Value) {
    // Handle inserts and updates
    if ((item.ValueID > 0) && ((this.DeviceID == 0) || (this.DeviceID == item.DeviceID))) {
      return true;
    }
    // Handle deletes (parent ID is not in payload)
    for (let entry of this.funcGetItems()) {
      if (entry.ValueID == item.ValueID * -1) {
        return true;
      }
    }
    return false;
  }
}
