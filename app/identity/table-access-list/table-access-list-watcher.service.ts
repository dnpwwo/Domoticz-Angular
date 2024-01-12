import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { TableAccess } from "src/app/identity/table-access";

export class TableAccessListWatcherService extends SharedWebSocketService<TableAccess> {

  constructor(private fConnect: () => void,
    private fGetItems: () => TableAccess[],
    private fDisconnect: () => void) {
    super("TableAccesss", fConnect, fGetItems, fDisconnect);
  }
  getName(item: TableAccess) { return "'" + item.Name + "'"; }
  getID(item: TableAccess) { return item.TableAccessID; }
}
