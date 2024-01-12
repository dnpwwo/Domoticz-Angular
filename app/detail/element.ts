export class Element {
  ElementID: number;
  TabID: number;
  Name: string;
  ValueID: number;
  Type: string;
  Class: string;
  ContainingElementID: number;
  RelativePosition: boolean;
  OffsetX: number;
  OffsetY: number;
  Height: number;
  Width: number;
  ScreenUnits: string;
  BorderRadius: number;
  Padding: string;
  Margin: string;
  Colour: string;
  Transparency: number;
  ZIndex: number;
  URL: string;
  Javascript: string;
  Action: string;
  RefreshSeconds: number;
  constructor(ElementID: number = -1,
    TabID: number = -1,
    Name: string = '',
    ValueID: number = -1,
    Type: string,
    Class: string,
    ContainingElementID: number = -1,
    RelativePosition: boolean = false,
    OffsetX: number = -1,
    OffsetY: number = -1,
    Height: number = -1,
    Width: number = -1,
    ScreenUnits: string = '',
    BorderRadius: number = 0,
    Padding: string = '',
    Margin: string = '',
    Colour: string = '',
    Transparency: number = 0,
    ZIndex: number = 0,
    URL: string = '',
    Javascript: string = '',
    Action: string = '',
    RefreshSeconds: number = 0) {
    this.ElementID = ElementID;
    this.TabID = TabID,
    this.Name = Name;
    this.ValueID = ValueID;
    this.Type = Type;
    this.Class = Class;
    this.ContainingElementID = ContainingElementID;
    this.RelativePosition = RelativePosition;
    this.OffsetX = OffsetX;
    this.OffsetY = OffsetY;
    this.Height = Height;
    this.Width = Width;
    this.ScreenUnits = ScreenUnits;
    this.BorderRadius = BorderRadius;
    this.Padding = Padding;
    this.Margin = Margin;
    this.Colour = Colour;
    this.Transparency = Transparency;
    this.ZIndex = ZIndex;
    this.URL = URL;
    this.Javascript = Javascript;
    this.Action = Action;
    this.RefreshSeconds = RefreshSeconds;
  }
}

export class ElementMessage {
  Count: number;
  Element: Element;
}

export class ElementsMessage {
  Count: number;
  Elements: Element[];
}
