import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth-page/auth.component';
import { RegistrationsPageComponent } from './pages/registrations-page/registrations-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {path: 'login', component: LoginPageComponent},
      {path: 'registrations', component: RegistrationsPageComponent},
      {path: '', redirectTo: 'login'},
    ],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
