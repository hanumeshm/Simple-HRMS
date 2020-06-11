import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login-component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
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
