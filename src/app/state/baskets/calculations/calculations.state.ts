import { IShopProduct } from '../../../../models/products';
import { stateNames } from '../../consts/state-names';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LocalStorageService } from '../../../core/servers/local-storage.service';
import { ICalculationsUser, IDiet } from '../../../modules/calculations/models/calculations';
import { InitBasketState, ResetFormData, SetBasketFormData, SetUserCalcData } from './calculations.actions';
import { CalculationsService } from '../../../modules/calculations/servers/calculations.service';

export interface ICalculationsState {
  user: ICalculationsUser | null;
  term: number;
  maxSum: number;
  energyAmount: number;
  MIT: number;
  products?: IShopProduct[];
  isActive: boolean;
  diet?: IDiet;
  dietId?: number;
  energyRestrictions?: Record<string, number[]>;
}

const DefaultCalculationsState: ICalculationsState = {
  user: null,
  term: 0,
  maxSum: 0,
  energyAmount: 0,
  MIT: 0,
  products: [],
  isActive: false,
};


@State<ICalculationsState>({
  name: stateNames.calculations,
  defaults: DefaultCalculationsState
})
@Injectable()
export class CalculationsState {

  readonly STORE_KEY = 'basket-form';

  @Selector()
  static calculationsForm(state: ICalculationsState): ICalculationsState {
    return state;
  }

  @Selector()
  static user(state: ICalculationsState): ICalculationsUser | null {
    return state.user;
  }

  @Selector()
  static isActive(state: ICalculationsState): boolean {
    return state.isActive;
  }

  constructor(
    private calculationsService: CalculationsService,
    private localStorageService: LocalStorageService,
  ) {}

  @Action(InitBasketState)
  initBasketState(ctx: StateContext<ICalculationsState>) {
    const state = this.localStorageService.get<ICalculationsState>(this.STORE_KEY);
    if (state && state.isActive) {
      ctx.patchState(state)
    }
  }

  @Action(SetBasketFormData)
  setAsCurrentBasket(ctx: StateContext<ICalculationsState>, action: SetBasketFormData) {
    ctx.patchState({
      ...action.payload,
      energyAmount: this.calculationsService.getDailyCCalAmount(action.payload.user),
      MIT: this.calculationsService.getMIT(action.payload.user),
      isActive: true,
    });
    this.localStorageService.set(this.STORE_KEY, ctx.getState());
  }

  @Action(SetUserCalcData)
  setUserCalcData(ctx: StateContext<ICalculationsState>, action: SetUserCalcData) {
    ctx.patchState({
      user: action.payload,
      energyAmount: this.calculationsService.getDailyCCalAmount(action.payload),
      MIT: this.calculationsService.getMIT(action.payload),
    });
    this.localStorageService.set(this.STORE_KEY, ctx.getState());
  }

  @Action(ResetFormData)
  resetFormData(ctx: StateContext<ICalculationsState>) {
    ctx.patchState(DefaultCalculationsState);
    this.localStorageService.set(this.STORE_KEY, ctx.getState());
  }
}
