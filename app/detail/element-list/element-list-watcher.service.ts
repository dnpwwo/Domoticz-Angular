import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { Element } from "src/app/detail/element";

export class ElementListWatcherService extends SharedWebSocketService<Element> {

  constructor(private fConnect: () => void,
    private fGetItems: () => Element[],
    private fDisconnect: () => void,
    private TabID: number = 0) {
    super("Elements", fConnect, fGetItems, fDisconnect);
  }
  getName(item: Element) { return "'" + item.Name + "'"; }
  getID(item: Element) { return item.ElementID; }

  isRelevant(item: Element) {
    // Handle inserts and updates
    if ((item.ElementID > 0) && ((this.TabID == 0) || (this.TabID == item.TabID))) {
      return true;
    }
    // Handle deletes (parent ID is not in payload)
    for (let entry of this.funcGetItems()) {
      if (entry.ElementID == item.ElementID * -1) {
        return true;
      }
    }
    return false;
  }
}
