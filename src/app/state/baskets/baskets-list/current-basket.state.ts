import { stateNames } from '../../consts/state-names';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {
  GetUserBaskets, RemoveBaskets,
} from './current-basket.actions';
import { Observable, tap } from 'rxjs';
import { OptimizationService } from '../../../core/servers/optimization.service';
import { LocalStorageService } from '../../../core/servers/local-storage.service';
import { IProductBasket } from '../../../../models/http-api';

export interface IBasketsListState {
  list: IProductBasket[];
}

const DefaultBasketsListState: IBasketsListState = {
  list: [],
};


@State<IBasketsListState>({
  name: stateNames.basketsList,
  defaults: DefaultBasketsListState
})
@Injectable()
export class BasketsListState {

  @Selector()
  static userBaskets(state: IBasketsListState): IProductBasket[] {
    return state.list;
  }

   constructor(
    private optimizationService: OptimizationService,
    private localStorageService: LocalStorageService,
    private store: Store,
  ) {}


  @Action(GetUserBaskets)
  getUserBaskets(ctx: StateContext<IBasketsListState>): Observable<any> {
    return this.optimizationService.getProductsList()
      .pipe(
        tap(
          res => ctx.patchState({list: res})
        ),
      );
  }

  @Action(RemoveBaskets)
  removeBaskets(ctx: StateContext<IBasketsListState>, action: RemoveBaskets): Observable<any> {
    return this.optimizationService.removeProductBasket(action.payload)
      .pipe(
        tap(
          res => ctx.dispatch(new GetUserBaskets())
        ),
      );
  }
}
