import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
import { LoginComponent } from './login/login-component';
import { AuthGuard } from './login/auth.guard';
import { EmployeeViewComponent } from './employees/employee-view/employee-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: EmployeeListComponent, canActivate: [AuthGuard] },
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
