export class Value {
  ValueID: number;
  Name: string;
  InternalID: string;
  DeviceID: number;
  UnitID: number;
  Value: string;
  RetentionDays: number;
  RetentionInterval: number;
  UpdateScript: string;
  Debug: boolean;
  Timestamp: string;
  constructor(ValueID: number = -1, Name: string = "", InternalID: string = "", DeviceID: number = -1, UnitID: number = -1,
    Value: string = "", RetentionDays: number = 30, RetentionInterval: number = 900, UpdateScript: string = "", Debug: boolean = false, Timestamp: string = "") {
    this.ValueID = ValueID;
    this.Name = Name;
    this.InternalID = InternalID;
    this.DeviceID = DeviceID;
    this.UnitID = UnitID;
    this.Value = Value;
    this.RetentionDays = RetentionDays;
    this.RetentionInterval = RetentionInterval;
    this.UpdateScript = UpdateScript;
    this.Debug = Debug;
    this.Timestamp = Timestamp;
  }
}

export class ValueMessage {
  Count: number;
  Value: Value;
}

export class ValuesMessage {
  Count: number;
  Values: Value[];
}
