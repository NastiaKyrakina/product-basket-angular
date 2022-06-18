import { Component, OnInit } from '@angular/core';
import { OptimizationService } from '../../../../core/servers/optimization.service';
import { Select, Selector, Store } from '@ngxs/store';
import { GetUserBaskets } from '../../../../state/baskets/baskets-list/current-basket.actions';
import { BasketsListState } from '../../../../state/baskets/baskets-list/current-basket.state';
import { Observable } from 'rxjs';
import { IProductBasket } from '../../../../../models/http-api';
import { CalculationsState, ICalculationsState } from '../../../../state/baskets/calculations/calculations.state';
import { ICalculationsUser } from '../../../calculations/models/calculations';
import { UserState } from '../../../../state/user/user.state';
import { IUser } from '../../../auth/models/auth';

@Component({
  selector: 'app-products-baskets',
  templateUrl: './products-baskets.component.html',
  styleUrls: ['./products-baskets.component.scss']
})
export class ProductsBasketsComponent implements OnInit {

  @Select(BasketsListState.userBaskets) userBaskets$!: Observable<IProductBasket[]>;
  @Select(UserState.user) user$!: Observable<IUser>;
  @Select(CalculationsState.calculationsForm) calculationsData$!: Observable<ICalculationsState>;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetUserBaskets());
  }

}
