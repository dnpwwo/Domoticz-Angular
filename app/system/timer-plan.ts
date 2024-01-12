export class TimerPlan {
  TimerPlanID: number;
  Name: string;
  Active: boolean;
  constructor(TimerPlanID: number = -1, Name: string = "", Active: boolean = false) {
    this.TimerPlanID = TimerPlanID;
    this.Name = Name;
    this.Active = Active;
  }
}

export class TimerPlanMessage {
  Count: number;
  TimerPlan: TimerPlan;
}

export class TimerPlansMessage {
  Count: number;
  TimerPlans: TimerPlan[];
}
