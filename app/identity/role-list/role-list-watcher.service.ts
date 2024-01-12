import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { Role } from "src/app/identity/role";

export class RoleListWatcherService extends SharedWebSocketService<Role> {

  constructor(private fConnect: () => void,
    private fGetItems: () => Role[],
    private fDisconnect: () => void) {
    super("Roles", fConnect, fGetItems, fDisconnect);
  }
  getName(item: Role) { return "'" + item.Name + "'"; }
  getID(item: Role) { return item.RoleID; }
}
