export class Tile {
  TileID: number;
  TabID: number;
  Name: string;
  DisplayOrder: number;
  RowSpan: number;
  ColumnSpan: number;
  BorderRadius: string;
  Background: string;
  constructor(TileID: number = -1,
    TabID: number = -1,
    Name: string = "",
    DisplayOrder: number = 0,
    RowSpan: number = 1,
    ColumnSpan: number = 1,
    BorderRadius: string = "",
    Background: string = "",
  ) {
    this.TileID = TileID;
    this.TabID = TabID;
    this.Name = Name;
    this.DisplayOrder = DisplayOrder;
    this.RowSpan = RowSpan;
    this.ColumnSpan = ColumnSpan;
    this.BorderRadius = BorderRadius;
    this.Background = Background;
  }
}

export class TileMessage {
  Count: number;
  Tile: Tile;
}

export class TilesMessage {
  Count: number;
  Tiles: Tile[];
}
