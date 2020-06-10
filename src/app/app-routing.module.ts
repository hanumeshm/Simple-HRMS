import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
//import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
import { LoginComponent } from './auth/login/login-component';
import { AuthGuard } from './auth/auth.guard';
//import { AuthGuard } from './auth/auth.guard';
//import { EmployeeViewComponent } from './employees/employee-view/employee-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employees/employees.module').then(m => m.EmployeesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
