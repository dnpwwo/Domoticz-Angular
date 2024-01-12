export class Unit {
  UnitID: number;
  Name: string;
  Minimum: number;
  Maximum: number;
  RetentionDays: number;
  RetentionInterval: number;
  IconList: string;
  TextLabels: string;
  constructor(UnitID: number = -1,
    Name: string = "",
    Minimum: number = 0,
    Maximum: number = 0,
    RetentionDays: number = 30,
    RetentionInterval: number = 900, 
    IconList: string = "",
    TextLabels: string = ""
  ) {
    this.UnitID = UnitID;
    this.Name = Name;
    this.Minimum = Minimum;
    this.Maximum = Maximum;
    this.RetentionDays = RetentionDays;
    this.RetentionInterval = RetentionInterval;
    this.IconList = IconList;
    this.TextLabels = TextLabels;
  }
}

export class UnitMessage {
  Count: number;
  Unit: Unit;
}

export class UnitsMessage {
  Count: number;
  Units: Unit[];
}
