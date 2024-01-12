import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { Tab } from "src/app/detail/tab";

export class TabListWatcherService extends SharedWebSocketService<Tab> {

  constructor(private fConnect: () => void,
    private fGetItems: () => Tab[],
    private fDisconnect: () => void) {
    super("Tabs", fConnect, fGetItems, fDisconnect);
  }
  getName(item: Tab) { return "'" + item.Name + "'"; }
  getID(item: Tab) { return item.TabID; }
}
