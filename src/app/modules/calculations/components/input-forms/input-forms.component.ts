import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptimizeBasketAndSetAsCurrent } from '../../../../state/baskets/current-basket/current-basket.actions';
import { Select, Selector, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { CalculationsService } from '../../servers/calculations.service';
import { ICalculations, Sex } from '../../models/calculations';
import { CalculationsState, ICalculationsState } from '../../../../state/baskets/calculations/calculations.state';
import { SetBasketFormData } from '../../../../state/baskets/calculations/calculations.actions';

@Component({
  selector: 'app-input-forms',
  templateUrl: './input-forms.component.html',
  styleUrls: ['./input-forms.component.scss']
})
export class InputFormsComponent implements OnInit, OnDestroy {

  @Select(CalculationsState.calculationsForm) calculationsForm$!: Observable<ICalculationsState>;
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

  energyPerDay!: number;
  userMIT!: number;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private calculationsService: CalculationsService,
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

    this.calculationsForm$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(calculationsForm => {
        this.energyPerDay = calculationsForm.energyAmount;
        this.userMIT = calculationsForm.MIT;
      });
  }

  getBasketForm(): FormGroup {
    return this.fb.group({
      term: ['week', [Validators.required]],
      maxSum: [1000, [Validators.required, Validators.min(0), Validators.max(20000)]],
    });
  }

  getUserForm(): FormGroup {
    return this.fb.group({
      height: [160, [Validators.required]],
      weight: [50, [Validators.required]],
      years: [30, [Validators.required]],
      sex: [Sex.Male, [Validators.required]],
    });
  }

  getUserWorkForm(): FormGroup {
    return this.fb.group({
      activityLevel: ['', [Validators.required]],
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

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    this.onDoneInteract();
    stepper.next();
  }

  onDoneInteract(): void {
    this.store.dispatch(new SetBasketFormData(this.getBasketFormData()));
  }

  getBasketFormData(): ICalculations {
    return {
      user: {
        ...this.userWorkForm.value,
        ...this.userForm.value,
      },
      ...this.basketForm.value,
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
