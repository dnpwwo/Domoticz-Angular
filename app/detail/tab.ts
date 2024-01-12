export class Tab {
  TabID: number;
  LayoutID: number;
  Name: string;
  DisplayOrder: number;
  Icon: string;
  Background: string;
  RowHeight: number;
  MinColumns: number;
  MaxColumns: number;
  MinColWidth: number;
  MaxColWidth: number;
  GutterSize: number;
  constructor(TabID: number = -1,
    LayoutID: number = -1,
    Name: string = "",
    DisplayOrder: number = 0,
    Icon: string = "",
    Background: string = "",
    RowHeight: number = 120,
    MinColumns: number = 4,
    MaxColumns: number = 8,
    MinColWidth: number = 90,
    MaxColWidth: number = 180,
    GutterSize: number = 5,
) {
    this.TabID = TabID;
    this.LayoutID = LayoutID;
    this.Name = Name;
    this.DisplayOrder = DisplayOrder;
    this.Icon = Icon;
    this.Background = Background;
    this.RowHeight = RowHeight;
    this.MinColumns = MinColumns;
    this.MaxColumns = MaxColumns;
    this.MinColWidth = MinColWidth;
    this.MaxColWidth = MaxColWidth;
    this.GutterSize = GutterSize;
  }
}

export class TabMessage {
  Count: number;
  Tab: Tab;
}

export class TabsMessage {
  Count: number;
  Tabs: Tab[];
}
