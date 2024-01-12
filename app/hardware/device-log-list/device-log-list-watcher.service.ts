import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { DeviceLog } from "src/app/hardware/device-log";

export class DeviceLogListWatcherService extends SharedWebSocketService<DeviceLog> {

  constructor(private fConnect: () => void,
    private fGetItems: () => DeviceLog[],
    private fDisconnect: () => void,
    private DeviceID:number = 0) {
    super("DeviceLogs", fConnect, fGetItems, fDisconnect);
  }
  getName(item: DeviceLog) { return 'Log item'; }
  getID(item: DeviceLog) { return item.DeviceLogID; }

  isRelevant(item: DeviceLog) {
    // Handle inserts and updates
    if ((item.DeviceLogID > 0) && ((this.DeviceID == 0) || (this.DeviceID == item.DeviceID))) {
      return true;
    }
    // Handle deletes (parent ID is not in payload)
    for (let entry of this.funcGetItems()) {
      if (entry.DeviceLogID == item.DeviceLogID * -1) {
        return true;
      }
    }
    return false;
  }
}
