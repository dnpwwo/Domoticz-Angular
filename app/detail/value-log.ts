export class ValueLog {
  ValueLogID: number;
  ValueID: number;
  Message: string;
  Timestamp: string;
  constructor(ValueLogID: number = 0, ValueID: number = 0, Message: string = "", Timestamp: string = "") {
    this.ValueLogID = ValueLogID;
    this.ValueID = ValueID;
    this.Message = Message;
    this.Timestamp = Timestamp;
  }
}

export class ValueLogsMessage {
  Count: number;
  ValueLogs: ValueLog[];
}
