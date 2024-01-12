import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimerPlanService {

  constructor(private httpClient: HttpClient) { }

  getTimerPlans() {
    return this.httpClient.get(environment.API_URL + 'TimerPlans')
  }

  getTimerPlan(TimerPlanId) {
    return this.httpClient.get(`${environment.API_URL + 'TimerPlans'}/${TimerPlanId}`);
  }

  createTimerPlan(TimerPlan) {
    return this.httpClient.post(`${environment.API_URL + 'TimerPlans'}`, JSON.stringify(TimerPlan))
      .subscribe(
        (val) => {
          console.log("POST call successful value: ", val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  updateTimerPlan(TimerPlanId, TimerPlan) {
    return this.httpClient.put(`${environment.API_URL + 'TimerPlans'}/${TimerPlanId}`, JSON.stringify(TimerPlan))
      .subscribe(
        (val) => {
          console.log("PUT call successful value: ", val);
        },
        response => {
          console.log("PUT call in error", response);
        },
        () => {
          console.log("The PUT observable is now completed.");
        });
  }

  deleteTimerPlan(TimerPlanId) {
    return this.httpClient.delete(`${environment.API_URL + 'TimerPlans'}/${TimerPlanId}`)
      .subscribe(
        (val) => {
          console.log("DELETE call successful value: ", val);
        },
        response => {
          console.log("DELETE call in error", response);
        },
        () => {
          console.log("The DELETE observable is now completed.");
        });
  }
}
