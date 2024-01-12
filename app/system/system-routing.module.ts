import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreferenceComponent } from "src/app/system/preference/preference.component";
import { PreferenceListComponent } from "src/app/system/preference-list/preference-list.component"; 
import { TimerPlanComponent } from "src/app/system/timer-plan/timer-plan.component";
import { TimerPlanListComponent } from "src/app/system/timer-plan-list/timer-plan-list.component"; 
import { UnitComponent } from "src/app/system/unit/unit.component";
import { UnitListComponent } from "src/app/system/unit-list/unit-list.component"; 
import { SceneComponent } from "src/app/system/scene/scene.component";
import { SceneListComponent } from "src/app/system/scene-list/scene-list.component"; 
import { AuthGuard } from 'src/app/auth-guard';

const systemRoutes: Routes = [
  { path: 'Preferences', component: PreferenceListComponent },
  { path: 'Preferences/:id', component: PreferenceComponent },
//  { path: 'TimerPlans', component: TimerPlanListComponent, canActivate: [AuthGuard] },
  { path: 'TimerPlans', component: TimerPlanListComponent },
//  { path: 'TimerPlans/:id', component: TimerPlanComponent, canActivate: [AuthGuard] },
  { path: 'TimerPlans/:id', component: TimerPlanComponent },
  { path: 'Units', component: UnitListComponent },
  { path: 'Units/:id', component: UnitComponent },
  { path: 'Scenes', component:SceneListComponent },
  { path: 'Scenes/:id', component: SceneComponent }
];

@NgModule({
  imports: [RouterModule.forChild(systemRoutes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
