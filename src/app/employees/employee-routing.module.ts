import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';

const routes: Routes = [
  { path: 'list', component: EmployeeListComponent, canActivate: [AuthGuard] },
  {
    path: 'create',
    component: EmployeeCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:employeeId',
    component: EmployeeCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view/:employeeId',
    component: EmployeeViewComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
