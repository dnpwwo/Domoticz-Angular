import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { User } from "src/app/identity/user";

export class UserListWatcherService extends SharedWebSocketService<User> {

  constructor(private fConnect: () => void,
    private fGetItems: () => User[],
    private fDisconnect: () => void) {
    super("Users", fConnect, fGetItems, fDisconnect);
  }
  getName(item: User) { return "'" + item.Name + "'"; }
  getID(item: User) { return item.UserID; }
}
