import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptimizeBasketAndSetAsCurrent } from '../../../../state/baskets/current-basket/current-basket.actions';
import { Select, Selector, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { UserCalculationsService } from '../../servers/user-calculations.service';
import { ICalculations, IDiet, ActivityLevel, Sex } from '../../models/calculations';
import { CalculationsState, ICalculationsState } from '../../../../state/baskets/calculations/calculations.state';
import { SetBasketFormData } from '../../../../state/baskets/calculations/calculations.actions';
import { DietService } from '../../../../core/servers/diet.service';
import { PERIOD_TO_DAYS } from '../../constants/constants';
import { ProductsService } from '../../../../core/servers/products.service';
import { ICategory } from '../../../../../models/products';
import { stateNames } from '../../../../state/consts/state-names';

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

  basketForm!: FormGroup;
  userForm!: FormGroup;
  userWorkForm!: FormGroup;
  dietForm!: FormGroup;

  isEditable = true;
  optimizationInProgress = false;

  energyPerDay!: number;
  userMIT!: number;

  diets: IDiet[] = [];
  categories: ICategory[] = [];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private dietsService: DietService,
    private productsService: ProductsService,
  ) {}

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.basketForm = this.getBasketForm();
    this.userForm = this.getUserForm();
    this.userWorkForm = this.getUserWorkForm();
    this.dietForm = this.getDietForm();
    this.calculationsGroup = this.fb.group({
      basket: this.basketForm,
      user: this.userForm,
      userWork: this.userWorkForm,
      dietForm: this.dietForm,
    });

    this.calculationsForm$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(calculationsForm => {
        this.energyPerDay = calculationsForm.energyAmount;
        this.userMIT = calculationsForm.MIT;
      });

    this.dietsService.getDiets()
      .subscribe(diets => this.diets = diets);

    this.productsService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  getBasketForm(): FormGroup {
    return this.fb.group({
      term: [1, [Validators.required]],
      maxSum: [120, [Validators.required, Validators.min(0), Validators.max(20000)]],
    });
  }
  getDietForm(): FormGroup {
    return this.fb.group({
      dietId: [1, [Validators.required]],
      categoriesToExclude: [[], ],
    });
  }

  getUserForm(): FormGroup {
    return this.fb.group({
      height: [158, [Validators.required]],
      weight: [57, [Validators.required]],
      years: [25, [Validators.required]],
      sex: [Sex.Female, [Validators.required]],
    });
  }

  getUserWorkForm(): FormGroup {
    return this.fb.group({
      activityLevel: [ActivityLevel.medium, [Validators.required]],
    });
  }

  optimizeProductBasket(): void {
    this.optimizationInProgress = true;
    this.store.dispatch(new SetBasketFormData(this.getBasketFormData())).subscribe(() => {
      this.store.dispatch(new OptimizeBasketAndSetAsCurrent({}))
        .pipe(
          finalize(() => this.optimizationInProgress = false)
        )
        .subscribe(
          res => {
            const id = res[stateNames.currentBasket].basketID;
            this.router.navigateByUrl(`baskets/${id}`)
          }
        );
    })
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
      term: this.basketForm.value.term,
      diet: this.diets.find(diet => diet.id === this.dietForm.value.dietId)
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
