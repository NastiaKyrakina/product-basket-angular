import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptimizeBasketAndSetAsCurrent } from '../../../state/baskets/current-basket/current-basket.actions';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-input-forms',
  templateUrl: './input-forms.component.html',
  styleUrls: ['./input-forms.component.scss']
})
export class InputFormsComponent implements OnInit {

  // @ts-ignore
  firstFormGroup: FormGroup;
  // @ts-ignore
  calculationsGroup: FormGroup;

  // @ts-ignore
  basketForm: FormGroup;
  // @ts-ignore
  userForm: FormGroup;
  // @ts-ignore
  userWorkForm: FormGroup;

  isEditable = true;
  optimizationInProgress = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.basketForm = this.getBasketForm();
    this.userForm = this.getUserForm();
    this.userWorkForm = this.getUserWorkForm();
    this.calculationsGroup = this.fb.group({
      basket: this.basketForm,
      user: this.userForm,
      userWork: this.userWorkForm,
    });
  }

  getBasketForm(): FormGroup {
    return this.fb.group({
      term: ['week', [Validators.required]],
      sum: [1000, [Validators.required, Validators.min(100), Validators.max(20000)]],
    });
  }

  getUserForm(): FormGroup {
    return this.fb.group({
      height: ['160', [Validators.required]],
      weight: ['50', [Validators.required]],
      sex: ['M', [Validators.required]],
    });
  }

  getUserWorkForm(): FormGroup {
    return this.fb.group({
      workType: ['', [Validators.required]],
    });
  }

  optimizeProductBasket(): void {
    this.optimizationInProgress = true;
    this.store.dispatch(new OptimizeBasketAndSetAsCurrent({}))
      .pipe(
        finalize(() => this.optimizationInProgress = false)
      )
      .subscribe(
        () => this.router.navigateByUrl('baskets/new')
      );
  }
}
