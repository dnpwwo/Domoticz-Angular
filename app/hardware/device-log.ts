export class DeviceLog {
  DeviceLogID: number;
  DeviceID: number;
  Message: string;
  Timestamp: string;
  constructor(DeviceLogID: number, DeviceID: number, Message: string, Timestamp: string) {
    this.DeviceLogID = DeviceLogID;
    this.DeviceID = DeviceID;
    this.Message = Message;
    this.Timestamp = Timestamp;
  }
}

export class DeviceLogsMessage {
  Count: number;
  DeviceLogs: DeviceLog[];
}
