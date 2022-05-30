import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CurrentBasketState, ICurrentBasketState } from '../../../state/baskets/current-basket/current-basket.state';
import { IProduct, IShopProduct } from '../../../../models/products';
import { IOptimizationGeneral } from '../../../../models/optimization';
import { InitBasketState } from '../../../state/baskets/current-basket/current-basket.actions';

@Component({
  selector: 'app-current-basket',
  templateUrl: './current-basket.component.html',
  styleUrls: ['./current-basket.component.scss']
})
export class CurrentBasketComponent implements OnInit, OnDestroy {

  @Select(CurrentBasketState.currentBasket) currentBasket$!: Observable<ICurrentBasketState>;

  products: IShopProduct[] = [];
  general!: IOptimizationGeneral | null;
  isSaved = false;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new InitBasketState())
    this.subscribeToBasketState();
  }

  subscribeToBasketState(): void {

    this.currentBasket$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(basket => this.setBasketInfo(basket))
  }

  setBasketInfo(basket: ICurrentBasketState): void {
    ({ productBasket: this.products, general: this.general, isSaved: this.isSaved } = basket);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
