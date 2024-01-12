import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { ValueTimer } from "../value-timer";

export class ValueTimerListWatcherService extends SharedWebSocketService<ValueTimer> {

  constructor(private fConnect: () => void,
    private fGetItems: () => ValueTimer[],
    private fDisconnect: () => void) {
    super("ValueTimers", fConnect, fGetItems, fDisconnect);
  }
  getName(item: ValueTimer) { return item.Name; }
  getID(item: ValueTimer) { return item.ValueTimerID; }
}
