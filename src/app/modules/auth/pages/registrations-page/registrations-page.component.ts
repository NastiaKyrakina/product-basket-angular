import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { RegisterUserAction } from '../../../../state/user/user.actions';
import { finalize } from 'rxjs';
import { ERRORS_TEXT } from '../login-page/login-page.component';
import { ICalculationsUser, PhysicalActivityLevel, Sex } from '../../../calculations/models/calculations';
import { stateNames } from '../../../../state/consts/state-names';
import { ICalculationsState } from '../../../../state/baskets/calculations/calculations.state';

@Component({
  selector: 'app-registrations-page',
  templateUrl: './registrations-page.component.html',
  styleUrls: ['./registrations-page.component.scss']
})
export class RegistrationsPageComponent implements OnInit {

  readonly Sex = Sex;

  registrationForm!: FormGroup;
  userInfoForm!: FormGroup;

  requestError!: string;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit(): void {
    const calcUserData = this.getCalcData();
    this.createLoginForm();
    this.createUserCalcForm();
    if (calcUserData) {
      this.setDataToUserForm(calcUserData);
    }
  }

  createLoginForm(): void {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password1: ['', [Validators.required]],
      password2: ['', [Validators.required]],
    });
  }

  createUserCalcForm(): void {
    this.userInfoForm = this.fb.group({
      height: [160, [Validators.required]],
      weight: [60, [Validators.required]],
      years: [0, [Validators.required]],
      sex: [Sex.Male, [Validators.required]],
      activityLevel: ['', [Validators.required]],
    })
  }

  setDataToUserForm(user: ICalculationsUser): void {
    this.userInfoForm.patchValue({
      ...user
    });
  }

  getCalcData(): ICalculationsUser | null {
    return this.store.selectSnapshot<ICalculationsState>(store => store[stateNames.calculations]).user;
  }

  register(): void {
    if (this.registrationForm.invalid || this.userInfoForm.invalid || this.loading) {
      this.requestError = "Некоректні дані форми"
      return;
    }
    this.loading = true;
    this.store.dispatch(new RegisterUserAction({ user: this.registrationForm.value, calculations: this.userInfoForm.value}))
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
          if (errors.password1) {
            this.requestError = errors.password1[0];
          }
        }
      );
  }

  selectActivityLevel(activityLevel: PhysicalActivityLevel) {
    this.userInfoForm.patchValue({activityLevel})
  }
}
