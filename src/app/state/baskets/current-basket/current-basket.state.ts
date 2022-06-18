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
import { IBasketsListState } from '../baskets-list/current-basket.state';

export interface ICurrentBasketState {
  basketID?: number | null;
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
    const formData = this.store.selectSnapshot<ICalculationsState>(store => store[stateNames.calculations]);

    return this.optimizationService.optimizeProductsList(formData)
      .pipe(
        tap(() => ctx.dispatch(new ResetFormData())),
        tap(
          res => ctx.dispatch(new SetAsCurrentBasket(res))
        ),
      );
  }

  @Action(SetAsCurrentBasket)
  setAsCurrentBasket(ctx: StateContext<ICurrentBasketState>, action: SetAsCurrentBasket) {
    const basketData = action.payload;
    ctx.patchState({
      basketID: basketData.bucketID,
      productBasket: basketData.optimization.product_bucket,
      general: basketData.optimization.general,
      isSaved: !!basketData.bucketID,
    });
    this.localStorageService.set('new', ctx.getState());
  }

  @Action(GetBasketById)
  getBasketById(ctx: StateContext<ICurrentBasketState>, action: GetBasketById) {
    const baskets = this.store
      .selectSnapshot<IBasketsListState>(store => store[stateNames.basketsList])
      .list;
    const currentBasket = baskets.find(basket => basket.id == action.payload.basketID)
    if (currentBasket) {
      ctx.patchState({
        basketID: currentBasket.id,
        productBasket: currentBasket.products.product_bucket,
        general: currentBasket.products.general,
        isSaved: true,
      });
    }
    // this.localStorageService.set('new', ctx.getState());
  }
}
