export class InterfaceLog {
  InterfaceLogID: number;
  InterfaceID: number;
  Message: string;
  Timestamp: string;
  constructor(InterfaceLogID: number, InterfaceID: number, Message: string, Timestamp: string) {
    this.InterfaceLogID = InterfaceLogID;
    this.InterfaceID = InterfaceID;
    this.Message = Message;
    this.Timestamp = Timestamp;
  }
}

export class InterfaceLogsMessage {
  Count: number;
  InterfaceLogs: InterfaceLog[];
}
