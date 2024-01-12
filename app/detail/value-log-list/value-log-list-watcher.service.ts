import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { ValueLog } from "src/app/detail/value-log";

export class ValueLogListWatcherService extends SharedWebSocketService<ValueLog> {

  constructor(private fConnect: () => void,
    private fGetItems: () => ValueLog[],
    private fDisconnect: () => void,
    private ValueID: number = 0) {
    super("ValueLogs", fConnect, fGetItems, fDisconnect);
  }
  getName(item: ValueLog) { return 'Log item'; }
  getID(item: ValueLog) { return item.ValueLogID; }

  isRelevant(item: ValueLog) {
    // Handle inserts and updates
    if ((item.ValueLogID > 0) && ((this.ValueID == 0) || (this.ValueID == item.ValueID))) {
      return true;
    }
    // Handle deletes (parent ID is not in payload)
    for (let entry of this.funcGetItems()) {
      if (entry.ValueLogID == item.ValueLogID * -1) {
        return true;
      }
    }
    return false;
  }
}
