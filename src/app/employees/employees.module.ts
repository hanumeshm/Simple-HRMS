import { NgModule } from '@angular/core';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AngularMaterialModule } from '../angular-material.module';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';
import { HeaderComponent } from '../header/header-component';
//import { AppRoutingModule } from '../app-routing.module';
import { EmployeeRoutingModule } from './employee-routing.module';

@NgModule({
  declarations: [
    EmployeeCreateComponent,
    EmployeeViewComponent,
    EmployeeListComponent,
    HeaderComponent
  ],
  imports: [
    AngularMaterialModule,
    // BrowserModule,
    CommonModule,
    FormsModule,
    GoogleChartsModule,
    EmployeeRoutingModule
  ]
})
export class EmployeesModule {}
