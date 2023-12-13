import { IShopProduct } from '../../../../models/products';
import { stateNames } from '../../consts/state-names';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LocalStorageService } from '../../../core/servers/local-storage.service';
import { IUserParams, IDiet } from '../../../modules/calculations/models/calculations';
import { InitBasketState, ResetFormData, SetBasketFormData, SetUserCalcData } from './calculations.actions';
import { UserCalculationsService } from '../../../modules/calculations/servers/user-calculations.service';

export interface ICalculationsState {
  user: IUserParams | null;
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
  static user(state: ICalculationsState): IUserParams | null {
    return state.user;
  }

  @Selector()
  static isActive(state: ICalculationsState): boolean {
    return state.isActive;
  }

  constructor(
    private calculationsService: UserCalculationsService,
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
      energyAmount: this.calculationsService.getDailyEnergy(action.payload.user),
      MIT: this.calculationsService.getBMI(action.payload.user),
      isActive: true,
    });
    this.localStorageService.set(this.STORE_KEY, ctx.getState());
  }

  @Action(SetUserCalcData)
  setUserCalcData(ctx: StateContext<ICalculationsState>, action: SetUserCalcData) {
    ctx.patchState({
      user: action.payload,
      energyAmount: this.calculationsService.getDailyEnergy(action.payload),
      MIT: this.calculationsService.getBMI(action.payload),
    });
    this.localStorageService.set(this.STORE_KEY, ctx.getState());
  }

  @Action(ResetFormData)
  resetFormData(ctx: StateContext<ICalculationsState>) {
    ctx.patchState(DefaultCalculationsState);
    this.localStorageService.set(this.STORE_KEY, ctx.getState());
  }
}
