import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { Device } from "src/app/hardware/device";

export class DeviceListWatcherService extends SharedWebSocketService<Device> {

  constructor(private fConnect: () => void,
    private fGetItems: () => Device[],
    private fDisconnect: () => void,
    private InterfaceID: number = 0) {
    super("Devices", fConnect, fGetItems, fDisconnect);
  }
  getName(item: Device) { return "'" + item.Name + "'"; }
  getID(item: Device) { return item.DeviceID; }

  isRelevant(item: Device) {
    // Handle inserts and updates
    if ((item.DeviceID > 0) && ((this.InterfaceID == 0) || (this.InterfaceID == item.InterfaceID))) {
      return true;
    }
    // Handle deletes (parent ID is not in payload)
    for (let entry of this.funcGetItems()) {
      if (entry.DeviceID == item.DeviceID * -1) {
        return true;
      }
    }
    return false;
  }
}
