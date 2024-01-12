export class Preference {
  PreferenceID: number;
  Name: string;
  Value: string;
  constructor(PreferenceID: number = -1, Name: string = "", Value: string = "") {
    this.PreferenceID = PreferenceID;
    this.Name = Name;
    this.Value = Value;
  }
}

export class PreferenceMessage {
  Count: number;
  Preference: Preference;
}

export class PreferencesMessage {
  Count: number;
  Preferences: Preference[];
}
