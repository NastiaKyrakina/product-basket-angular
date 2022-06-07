import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  links = [
    {title: 'Авторизація', link: 'login'},
    {title: 'Створити аккаунт', link: 'registrations'},
  ];
  activeLink = this.links[0].link;
  background: ThemePalette = undefined;
}
