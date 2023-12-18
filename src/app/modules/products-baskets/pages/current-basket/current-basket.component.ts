import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { CurrentBasketState, ICurrentBasketState } from '../../../../state/baskets/current-basket/current-basket.state';
import { IShopProduct } from '../../../../../models/products';
import { IOptimizationGeneral } from '../../../../../models/optimization';
import { GetBasketById, InitBasketState } from '../../../../state/baskets/current-basket/current-basket.actions';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { OptimizationService } from '../../../../core/servers/optimization.service';

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
  basketControl = new FormControl('', [Validators.required]);
  id!: number;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private optimizationService: OptimizationService,
  ) {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.id = +id;
          this.store.dispatch(new GetBasketById({basketID: +id}));
        }
      })
  }

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
    this.basketControl.setValue(basket.name);
    ({ productBasket: this.products, general: this.general, isSaved: this.isSaved } = basket);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  saveBasket(): void {
    this.optimizationService.updateProductBasketName(this.id, this.basketControl.value)
      .subscribe(res => {
        console.log(res);
      })

  }
}
