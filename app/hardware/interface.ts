export class Interface {
  InterfaceID: number;
  Name: string;
  Script: string;
  Configuration: string;
  Debug: boolean;
  Notifiable: boolean;
  Active: boolean;
  constructor(InterfaceID: number = -1, Name: string = "", Script: string = "", Configuration: string = "", Debug: boolean = false, Notifiable: boolean = false, Active: boolean = false) {
    this.InterfaceID = InterfaceID;
    this.Name = Name;
    this.Script = Script;
    this.Configuration = Configuration;
    this.Debug = Debug;
    this.Notifiable = Notifiable;
    this.Active = Active;
  }
}

export class InterfaceMessage {
  Count: number;
  Interface: Interface;
}

export class InterfacesMessage {
  Count: number;
  Interfaces: Interface[];
}
