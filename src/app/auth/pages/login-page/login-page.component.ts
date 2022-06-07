import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { LoginAction } from '../../../state/user/user.actions';
import { finalize } from 'rxjs';

export const ERRORS_TEXT: Record<string, string> = {
  'Unable to log in with provided credentials.': 'Невірне ім\`я користувача або пароль'
};

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  requestError!: string;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login(): void {
    if (this.loginForm.invalid || this.loading) {
      return;
    }
    this.loading = true;
    this.store.dispatch(new LoginAction(this.loginForm.value))
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        () => {},
        errorRes => {
          const errors = errorRes.error;
          if (errors?.non_field_errors?.length) {
            this.requestError = ERRORS_TEXT[errors.non_field_errors[0]];
          }
        }
      );
  }
}
