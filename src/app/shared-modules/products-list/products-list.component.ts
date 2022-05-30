import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { IProduct, IShopProduct } from '../../../models/products';
import { ProductAmountModule } from '../pipes/product-amount/product-amount.pipe';
import { ProductPriceModule } from '../pipes/product-price/product-amount.pipe';
import { ProductStateModule } from '../pipes/product-state/product-state.pipe';
import { ProductEnergyModule } from '../pipes/product-energy/product-amount.pipe';
import { ProductComponentModule } from '../pipes/product-component/product-amount.pipe';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  @Input() name!: string;
  @Input() products: IShopProduct[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [
    ProductsListComponent
  ],
  exports: [
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    ProductAmountModule,
    ProductPriceModule,
    ProductStateModule,
    ProductEnergyModule,
    ProductComponentModule,
  ]
})
export class ProductsListModule {
}
