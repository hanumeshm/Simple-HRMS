import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login-component';
import { AngularMaterialModule } from '../angular-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [AngularMaterialModule, BrowserModule, CommonModule, FormsModule]
})
export class AuthModule {}
