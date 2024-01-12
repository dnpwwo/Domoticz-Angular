export class User {
  UserID: number;
  UserName: string;
  Password: string;
  Name: string;
  RoleID: number;
  Active: boolean;
  ForceChange: boolean;
  FailedAttempts: number;
  Theme: string;
  EmailAddress: string;
  MobileNumber: string;
  Timestamp: string;

  constructor(UserID: number = -1,
              UserName: string = "",
              Password: string = "",
              Name: string = "",
              RoleID: number = -1,
              Active: boolean = false,
              ForceChange: boolean = true,
              FailedAttempts: number = 0,
              EmailAddress: string = "",
              MobileNumber: string = "",
              Theme: string = "",
              Timestamp: string = "") {
    this.UserID = UserID;
    this.UserName = UserName;
    this.Password = Password;
    this.Name = Name;
    this.RoleID = RoleID;
    this.Active = Active;
    this.ForceChange = ForceChange;
    this.FailedAttempts = FailedAttempts;
    this.EmailAddress = Theme;
    this.MobileNumber = Theme;
    this.Theme = Theme;
    this.Timestamp = Timestamp;
  }
}

export class UserMessage {
  Count: number;
  User: User;
}

export class UsersMessage {
  Count: number;
  Users: User[];
}
