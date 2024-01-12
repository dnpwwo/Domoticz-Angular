export class Layout {
  LayoutID: number;
  Name: string;
  MinimumWidth: number;
  Active: boolean;
  constructor(LayoutID: number = -1,
    Name: string = "",
    MinimumWidth: number = 0,
    Active: boolean = false) {
    this.LayoutID = LayoutID;
    this.Name = Name;
    this.MinimumWidth = MinimumWidth;
    this.Active = Active;
  }
}

export class LayoutMessage {
  Count: number;
  Layout: Layout;
}

export class LayoutsMessage {
  Count: number;
  Layouts: Layout[];
}
