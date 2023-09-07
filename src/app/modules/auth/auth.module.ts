import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './pages/auth-page/auth.component';
import { RegistrationsPageComponent } from './pages/registrations-page/registrations-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { CalculationsModule } from '../calculations/calculations.module';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';


@NgModule({
  declarations: [
    AuthComponent,
    RegistrationsPageComponent,
    LoginPageComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    CalculationsModule
  ]
})
export class AuthModule { }
