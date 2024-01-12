export class ValueHistory {
  ValueHistoryID: number;
  ValueID: number;
  Value: string;
  Timestamp: string;
  constructor(ValueHistoryID: number, ValueID: number, Value: string, Timestamp: string) {
    this.ValueHistoryID = ValueHistoryID;
    this.ValueID = ValueID;
    this.Value = Value;
    this.Timestamp = Timestamp;
  }
}

export class ValueHistorysMessage {
  Count: number;
  ValueHistorys: ValueHistory[];
}
