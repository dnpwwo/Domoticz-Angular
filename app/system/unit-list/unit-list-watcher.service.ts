import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { Unit } from "../unit";

export class UnitListWatcherService extends SharedWebSocketService<Unit> {

  constructor(private fConnect: () => void,
    private fGetItems: () => Unit[],
    private fDisconnect: () => void) {
    super("Units", fConnect, fGetItems, fDisconnect);
  }
  getName(item: Unit) { return "'" + item.Name + "'"; }
  getID(item: Unit) { return item.UnitID; }
}
