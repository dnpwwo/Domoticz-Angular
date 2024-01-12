import { SharedWebSocketService } from 'src/app/shared-web-socket.service';
import { Tile } from "src/app/detail/tile";

export class TileListWatcherService extends SharedWebSocketService<Tile> {

  constructor(private fConnect: () => void,
    private fGetItems: () => Tile[],
    private fDisconnect: () => void) {
    super("Tiles", fConnect, fGetItems, fDisconnect);
  }
  getName(item: Tile) { return "'" + item.Name + "'"; }
  getID(item: Tile) { return item.TileID; }
}
