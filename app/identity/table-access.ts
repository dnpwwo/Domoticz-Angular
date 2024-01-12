export class TableAccess {
  TableAccessID: number;
  Name: string;
  RoleID: number;
  CanGET: boolean;
  CanPOST: boolean;
  CanPUT: boolean;
  CanPATCH: boolean;
  CanDELETE: boolean;
  DontGETFields: string;
  PUTFields: string;
  PATCHFields: string;
  constructor(TableAccessID: number = -1,
    Name: string = "",
    RoleID: number = -1,
    CanGET: boolean = false,
    CanPOST: boolean = false,
    CanPUT: boolean = false,
    CanPATCH: boolean = false,
    CanDELETE: boolean = false,
    DontGETFields: string = "",
    PUTFields: string = "*",
    PATCHFields: string = "*") {
    this.TableAccessID = TableAccessID;
    this.Name = Name;
    this.RoleID = RoleID;
    this.CanGET = CanGET;
    this.CanPOST = CanPOST;
    this.CanPUT = CanPUT;
    this.CanPATCH = CanPATCH;
    this.CanDELETE = CanDELETE;
    this.DontGETFields = DontGETFields;
    this.PUTFields = PUTFields;
    this.PATCHFields = PATCHFields;
  }
}

export class TableAccessMessage {
  Count: number;
  TableAccess: TableAccess;
}

export class TableAccesssMessage {
  Count: number;
  TableAccesss: TableAccess[];
}
