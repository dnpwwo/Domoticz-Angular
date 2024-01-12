import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { ValueHistory } from "src/app/detail/value-history";

export class ValueHistoryListWatcherService extends SharedWebSocketService<ValueHistory> {

  constructor(private fConnect: () => void,
    private fGetItems: () => ValueHistory[],
    private fDisconnect: () => void,
    private ValueID: number = 0) {
      super("ValueHistorys", fConnect, fGetItems, fDisconnect);
  }
  getName(item: ValueHistory) { return 'Value history'; }
  getID(item: ValueHistory) { return item.ValueHistoryID; }

  isRelevant(item: ValueHistory) {
    // Handle inserts and updates
    if ((item.ValueHistoryID > 0) && ((this.ValueID == 0) || (this.ValueID == item.ValueID))) {
      return true;
    }
    // Handle deletes (parent ID is not in payload)
    for (let entry of this.funcGetItems()) {
      if (entry.ValueHistoryID == item.ValueHistoryID * -1) {
        return true;
      }
    }
    return false;
  }
}
