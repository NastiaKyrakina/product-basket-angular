import { IShopProduct } from '../../../../models/products';
import { stateNames } from '../../consts/state-names';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { OptimizationService } from '../../../core/servers/optimization.service';
import { LocalStorageService } from '../../../core/servers/local-storage.service';
import { ICalculationsUser } from '../../../calculations/models/calculations';
import { InitBasketState, ResetFormData, SetBasketFormData } from './calculations.actions';
import { CalculationsService } from '../../../calculations/servers/calculations.service';

export interface ICalculationsState {
  user: ICalculationsUser | null;
  term: number;
  maxSum: number;
  energyAmount: number;
  MIT: number;
  products?: IShopProduct[];
  isActive: boolean;
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
  static isActive(state: ICalculationsState): boolean {
    return state.isActive;
  }

  constructor(
    private optimizationService: OptimizationService,
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

  @Action(ResetFormData)
  resetFormData(ctx: StateContext<ICalculationsState>) {
    ctx.patchState(DefaultCalculationsState);
    this.localStorageService.set(this.STORE_KEY, ctx.getState());
  }
}
