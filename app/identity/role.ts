export class Role {
  RoleID: number;
  Name: string;
  RemoteAccess: boolean;
  InternalTTL: number;
  RemoteTTL: number;
  constructor(RoleID: number = -1,
    Name: string = "",
    RemoteAccess: boolean = false,
    InternalTTL: number = 0,
    RemoteTTL: number = 0) {
    this.RoleID = RoleID;
    this.Name = Name;
    this.RemoteAccess = RemoteAccess;
    this.InternalTTL = InternalTTL;
    this.RemoteTTL = RemoteTTL;
  }
}

export class RoleMessage {
  Count: number;
  Role: Role;
}

export class RolesMessage {
  Count: number;
  Roles: Role[];
}
