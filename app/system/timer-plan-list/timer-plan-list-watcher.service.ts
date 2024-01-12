import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { TimerPlan } from "../timer-plan";

export class TimerPlanListWatcherService extends SharedWebSocketService<TimerPlan> {

  constructor(private fConnect: () => void,
    private fGetItems: () => TimerPlan[],
    private fDisconnect: () => void) {
    super("TimerPlans", fConnect, fGetItems, fDisconnect);
  }
  getName(item: TimerPlan) { return "'" + item.Name + "'"; }
  getID(item: TimerPlan) { return item.TimerPlanID; }
}
