import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IShopProduct } from '../../../../models/products';

@Pipe({
  name: 'productAmount'
})
export class ProductAmountPipe implements PipeTransform {

  transform(product: IShopProduct): string {
    return `${product.amount} ${product.unit}`;
  }

}

@NgModule({
  declarations: [
    ProductAmountPipe
  ],
  exports: [
    ProductAmountPipe
  ],
  imports: [
    CommonModule
  ]
})
export class ProductAmountModule {
}
