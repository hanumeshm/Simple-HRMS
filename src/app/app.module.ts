import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EmployeesService } from './employees/employees.service';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptorService } from './auth/token-interceptor.service';
import { ExcelService } from './employees/excel.service';
import { ErrorInterceptor } from './error-interceptor.service';
import { AngularMaterialModule } from './angular-material.module';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth-module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    AngularMaterialModule,
    EmployeesModule,
    AuthModule
  ],
  providers: [
    EmployeesService,
    ExcelService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
