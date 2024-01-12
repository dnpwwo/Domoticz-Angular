import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogonComponent } from 'src/app/iam/logon/logon.component';


const iamRoutes: Routes = [
  { path: 'Authenticate', component: LogonComponent },
  { path: 'Profile', component: LogonComponent },
  { path: 'Logoff', component: LogonComponent }
];

@NgModule({
  imports: [RouterModule.forChild(iamRoutes)],
  exports: [RouterModule]
})
export class IAMRoutingModule { }
