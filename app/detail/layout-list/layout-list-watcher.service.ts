import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { Layout } from "src/app/detail/layout";

export class LayoutListWatcherService extends SharedWebSocketService<Layout> {

  constructor(private fConnect: () => void,
    private fGetItems: () => Layout[],
    private fDisconnect: () => void) {
    super("Layouts", fConnect, fGetItems, fDisconnect);
  }
  getName(item: Layout) { return "'" + item.Name + "'"; }
  getID(item: Layout) { return item.LayoutID; }
}
