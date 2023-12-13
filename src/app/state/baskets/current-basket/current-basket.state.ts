import { IOptimizationGeneral } from '../../../../models/optimization';
import { IProduct, IShopProduct } from '../../../../models/products';
import { stateNames } from '../../consts/state-names';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {
  GetBasketById,
  InitBasketState,
  OptimizeBasketAndSetAsCurrent,
  SetAsCurrentBasket
} from './current-basket.actions';
import { Observable, tap } from 'rxjs';
import { OptimizationService } from '../../../core/servers/optimization.service';
import { LocalStorageService } from '../../../core/servers/local-storage.service';
import { ICalculationsState } from '../calculations/calculations.state';
import { ResetFormData } from '../calculations/calculations.actions';
import { IDiet } from '../../../modules/calculations/models/calculations';

export interface ICurrentBasketState {
  basketID?: number | null;
  name?: string;
  productBasket: IShopProduct[];
  general: IOptimizationGeneral | null;
  isSaved: boolean;
}

const DefaultCurrentBasketState: ICurrentBasketState = {
  basketID: null,
  productBasket: [],
  general: null,
  isSaved: false,
};


@State<ICurrentBasketState>({
  name: stateNames.currentBasket,
  defaults: DefaultCurrentBasketState
})
@Injectable()
export class CurrentBasketState {

  @Selector()
  static currentBasket(state: ICurrentBasketState): ICurrentBasketState {
    return state;
  }

  @Selector()
  static products(state: ICurrentBasketState): IShopProduct[] {
    return state.productBasket;
  }

  @Selector()
  static general(state: ICurrentBasketState): IOptimizationGeneral | null {
    return state.general;
  }

  constructor(
    private optimizationService: OptimizationService,
    private localStorageService: LocalStorageService,
    private store: Store,
  ) {

  }

  @Action(InitBasketState)
  initBasketState(ctx: StateContext<ICurrentBasketState>, action: InitBasketState) {
    const basketID = action.payload?.basketID;
    const state = this.localStorageService.get<ICurrentBasketState>(basketID?.toString() || 'new');
    if (state) {
      ctx.patchState(state)
    }
  }

  @Action(OptimizeBasketAndSetAsCurrent)
  optimizeBasketAndSetAsCurrent(ctx: StateContext<ICurrentBasketState>, action: OptimizeBasketAndSetAsCurrent): Observable<any> {
    const {diet, ...formData} = this.store.selectSnapshot<ICalculationsState>(store => store[stateNames.calculations]);
   const energyRestrictions = this.getEnergyRestrictions(diet);
    return this.optimizationService.getOptimizationResults({...formData, dietId: diet?.id, energyRestrictions})
      .pipe(
        tap(() => ctx.dispatch(new ResetFormData())),
        tap(
          res => ctx.dispatch(new SetAsCurrentBasket(res))
        ),
      );
  }

  getEnergyRestrictions(diet?: IDiet): Record<string, number[]> {
    if(!diet) {
      return  {
        'carbohydrates': [0.45, 0.65],
        'proteins': [0.1, 0.35],
        'fats': [0.2, 0.35],
      };
    }
    return  {
      'carbohydrates': [diet.carbMin/100, diet.carbMax/100],
      'proteins': [diet.protMin/100, diet.protMax/100],
      'fats': [diet.fatsMin/100, diet.fatsMax/100],
    }
  }

  @Action(SetAsCurrentBasket)
  setAsCurrentBasket(ctx: StateContext<ICurrentBasketState>, action: SetAsCurrentBasket) {
    const basketData = action.payload;
    ctx.patchState({
      basketID: basketData.bucketID,
      name: basketData.name,
      productBasket: basketData.optimization.product_bucket,
      general: basketData.optimization.general,
      isSaved: !!basketData.bucketID,
    });
    this.localStorageService.set('new', ctx.getState());
  }

  @Action(GetBasketById)
  getBasketById(ctx: StateContext<ICurrentBasketState>, action: GetBasketById): Observable<any> {
    return this.optimizationService.getProductBasket(action.payload.basketID)
      .pipe(
        tap(currentBasket => {
          if (currentBasket) {
            console.log(currentBasket);
            ctx.patchState({
              basketID: currentBasket.id,
              name: currentBasket.name,
              productBasket: currentBasket.products.product_bucket,
              general: currentBasket.products.general,
              isSaved: true,
            });
          }
        })
      )
    // const baskets = this.store
    //   .selectSnapshot<IBasketsListState>(store => store[stateNames.basketsList])
    //   .list;
    // const currentBasket = baskets.find(basket => basket.id == action.payload.basketID)

    // this.localStorageService.set('new', ctx.getState());
  }
}
