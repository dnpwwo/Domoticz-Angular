import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterfaceComponent } from "src/app/hardware/interface/interface.component";
import { InterfaceListComponent } from "src/app/hardware/interface-list/interface-list.component"; 
import { InterfaceLogListComponent } from "src/app/hardware/interface-log-list/interface-log-list.component"; 
import { DeviceListComponent } from "src/app/hardware/device-list/device-list.component"; 
import { DeviceComponent } from "src/app/hardware/device/device.component"; 
import { DeviceLogListComponent } from "src/app/hardware/device-log-list/device-log-list.component"; 
import { ValueListComponent } from "src/app/hardware/value-list/value-list.component"; 
import { ValueTimerListComponent } from "src/app/hardware/value-timer-list/value-timer-list.component"; 

import { AuthGuard } from 'src/app/auth-guard';

const interfaceRoutes: Routes = [
  { path: 'Interfaces', component: InterfaceListComponent },
  { path: 'Interfaces/:id', component: InterfaceComponent },
  { path: 'Interfaces/:id/InterfaceLogs', component: InterfaceLogListComponent },
  { path: 'Interfaces/:id/Devices', component: DeviceListComponent },
  { path: 'Devices/:id', component: DeviceComponent },
  { path: 'Devices/:id/Values', component: ValueListComponent },
  { path: 'Devices/:id/DeviceLogs', component: DeviceLogListComponent },
  { path: 'Values/:id/ValueTimers', component: ValueTimerListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(interfaceRoutes)],
  exports: [RouterModule]
})
export class HardwareRoutingModule { }
