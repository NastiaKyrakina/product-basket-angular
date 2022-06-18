import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsBasketsComponent } from './pages/baskets-list/products-baskets.component';
import { CurrentBasketComponent } from './pages/current-basket/current-basket.component';

const routes: Routes = [
  { path: '', component: ProductsBasketsComponent },
  { path: 'new', component: CurrentBasketComponent },
  { path: ':id', component: CurrentBasketComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsBasketsRoutingModule { }
