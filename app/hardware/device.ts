export class Device {
  DeviceID: number;
  InterfaceID: number;
  Name: string;
  InternalID: string;
  Address: string;
  Debug: boolean;
  Enabled: boolean;
  Active: boolean;
  Timestamp: string;
  constructor(DeviceID: number = -1, InterfaceID: number = -1, Name: string = "", InternalID: string = "", Address: string = "", Debug: boolean = false, Enabled: boolean = false, Active: boolean = false, Timestamp: string = "") {
    this.DeviceID = DeviceID;
    this.InterfaceID = InterfaceID;
    this.Name = Name;
    this.InternalID = InternalID;
    this.Address = Address;
    this.Debug = Debug;
    this.Enabled = Enabled;
    this.Active = Active;
    this.Timestamp = Timestamp;
  }
}

export class DeviceMessage {
  Count: number;
  Device: Device;
}

export class DevicesMessage {
  Count: number;
  Devices: Device[];
}

