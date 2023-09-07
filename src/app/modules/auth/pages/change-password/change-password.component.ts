import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { ChangePasswordAction, InitAuthState, LoginAction } from '../../../../state/user/user.actions';
import { finalize } from 'rxjs';
import { ERRORS_TEXT } from '../login-page/login-page.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm!: FormGroup;
  requestError!: string;
  loading = false;

  changed: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(): void {
    this.changePasswordForm = this.fb.group({
      oldsPassword: ['', [Validators.required]],
      password1: ['', [Validators.required]],
      password2: ['', [Validators.required]]
    })
  }

  login(): void {
    if (this.changePasswordForm.invalid || this.loading) {
      return;
    }
    this.loading = true;
    this.store.dispatch(new ChangePasswordAction({
      old_password: this.changePasswordForm.value.oldsPassword,
      new_password1: this.changePasswordForm.value.password1,
      new_password2: this.changePasswordForm.value.password2,
    }))
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        () => {
          this.changed = true;
        },
        errorRes => {
          const errors = errorRes.error;
          if (errors?.non_field_errors?.length) {
            this.requestError = ERRORS_TEXT[errors.non_field_errors[0]];
          } else {
            const firstErrorKey = Object.keys(errors)?.[0];
            this.requestError = firstErrorKey ? errors[firstErrorKey]?.[0] : '';
          }
        }
      );
  }
}
