import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValueComponent } from 'src/app/detail/value/value.component';
import { ValueLogListComponent } from 'src/app/detail/value-log-list/value-log-list.component';
import { ValueHistoryListComponent } from 'src/app/detail/value-history-list/value-history-list.component';
import { LayoutComponent } from "src/app/detail/layout/layout.component";
import { LayoutListComponent } from "src/app/detail/layout-list/layout-list.component";
import { TabListComponent } from "src/app/detail/tab-list/tab-list.component"; 
import { TileListComponent } from "src/app/detail/tile-list/tile-list.component"; 

const detailRoutes: Routes = [
  { path: 'Values/:id', component: ValueComponent },
  { path: 'Values/:id/ValueLogs', component: ValueLogListComponent },
  { path: 'Values/:id/ValueHistorys', component: ValueHistoryListComponent },
  { path: 'Tabs/:id/Tiles', component: TileListComponent },
  { path: 'Tabs', component: TabListComponent },
  { path: 'Layouts/:id/Tabs', component: TabListComponent },
  { path: 'Layouts', component: LayoutListComponent },
  { path: 'Layout', component: LayoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(detailRoutes)],
  exports: [RouterModule]
})
export class DetailRoutingModule { }
