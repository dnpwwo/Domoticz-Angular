export class ValueTimer {
  ValueTimerID: number;
  Name: string;
  TimerPlanID: number;
  ValueID: number;
  DayMask: string;
  Type: string;
  RunTime: string;
  Sunrise: boolean;
  Sunset: boolean;
  Frequency: number;
  Random: number;
  Script: string;
  constructor(ValueTimerID: number = -1,
    Name: string = "",
    TimerPlanID: number = -1,
    ValueID: number = -1,
    DayMask: string = "",
    Type: string = "",
    RunTime: string = "00:00:00",
    Sunrise: boolean = false,
    Sunset: boolean = false,
    Frequency: number = 0,
    Random: number = 0,
    Script: string = ""
  ) {
    this.ValueTimerID = ValueTimerID;
    this.Name = Name;
    this.TimerPlanID = TimerPlanID;
    this.ValueID = ValueID;
    this.DayMask = DayMask;
    this.Type = Type;
    this.RunTime = RunTime;
    this.Sunrise = Sunrise;
    this.Sunset = Sunset;
    this.Frequency = Frequency;
    this.Random = Random;
    this.Script = Script;
  }
}

export class UnitMessage {
  Count: number;
  ValueTimer: ValueTimer;
}

export class ValueTimersMessage {
  Count: number;
  ValueTimers: ValueTimer[];
}
