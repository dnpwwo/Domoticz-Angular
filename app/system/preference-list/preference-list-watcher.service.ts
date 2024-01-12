import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { Preference } from "src/app/system/preference";

export class PreferenceListWatcherService extends SharedWebSocketService<Preference> {

  constructor(private fConnect: () => void,
    private fGetItems: () => Preference[],
    private fDisconnect: () => void) {
    super("Preferences", fConnect, fGetItems, fDisconnect);
  }
  getName(item: Preference) { return "'" + item.Name + "'"; }
  getID(item: Preference) { return item.PreferenceID; }
}
