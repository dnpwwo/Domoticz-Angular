import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from "src/app/identity/role/role.component";
import { RoleListComponent } from "src/app/identity/role-list/role-list.component"; 
import { UserComponent } from "src/app/identity/user/user.component";
import { UserListComponent } from "src/app/identity/user-list/user-list.component"; 
import { TableAccessComponent } from "src/app/identity/table-access/table-access.component";
import { TableAccessListComponent } from "src/app/identity/table-access-list/table-access-list.component"; 


const identityRoutes: Routes = [
  { path: 'Roles', component:RoleListComponent },
  { path: 'Roles/:id', component: RoleComponent },
  { path: 'Roles/:id/Users', component: UserListComponent },
  { path: 'Roles/:id/TableAccesss', component: TableAccessListComponent },
  { path: 'Users', component: UserListComponent },
  { path: 'Users/:id', component: UserComponent },
  { path: 'TableAccesss/:id', component: TableAccessComponent }
];

@NgModule({
  imports: [RouterModule.forChild(identityRoutes)],
  exports: [RouterModule]
})
export class IdentityRoutingModule { }
