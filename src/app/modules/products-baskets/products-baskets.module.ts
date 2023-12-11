import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsBasketsRoutingModule } from './products-baskets-routing.module';
import { ProductsBasketsComponent } from './pages/baskets-list/products-baskets.component';
import { CurrentBasketComponent } from './pages/current-basket/current-basket.component';
import { MatTabsModule } from '@angular/material/tabs';
import { OptimizationResultPieComponent } from './components/optimization-result-pie/optimization-result-pie.component';
import { PieChartModule } from '@swimlane/ngx-charts';
import { DeckRowModule } from '../../shared-modules/deck-row/deck-row.component';
import { OptimizationResultComponent } from './pages/current-basket/optimization-result/optimization-result.component';
import { BasketProductsComponent } from './pages/current-basket/basket-products/basket-products.component';
import { ProductsListModule } from '../../shared-modules/products-list/products-list.component';
import { FaIconModule } from '../../shared-modules/fa-icon/fa-icon.component';
import { MatButtonModule } from '@angular/material/button';
import { BasketsTableComponent } from './components/baskets-table/baskets-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductsBasketsComponent,
    CurrentBasketComponent,
    OptimizationResultPieComponent,
    OptimizationResultComponent,
    BasketProductsComponent,
    BasketsTableComponent
  ],
  imports: [
    CommonModule,
    ProductsBasketsRoutingModule,
    MatTabsModule,
    PieChartModule,
    DeckRowModule,
    ProductsListModule,
    FaIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProductsBasketsModule { }
