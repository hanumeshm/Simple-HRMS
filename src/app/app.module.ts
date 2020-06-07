import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { GoogleChartsModule } from 'angular-google-charts';
import { MatSortModule } from '@angular/material/sort';

import { AppComponent } from './app.component';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
import { HeaderComponent } from './header/header-component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeesService } from './employees/employees.service';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login-component';
import { TokenInterceptorService } from './login/token-interceptor.service';
import { EmployeeViewComponent } from './employees/employee-view/employee-view.component';
import { ExcelService } from './employees/excel.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeCreateComponent,
    HeaderComponent,
    EmployeeListComponent,
    LoginComponent,
    EmployeeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDividerModule,
    FlexLayoutModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatRadioModule,
    MatGridListModule,
    GoogleChartsModule,
    MatSortModule
  ],
  providers: [
    MatDatepickerModule,
    EmployeesService,
    ExcelService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
