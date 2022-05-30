import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IShopProduct, ShopProduct } from '../../../../models/products';

const PRICE_UNIT = 'грн.'

@Pipe({
  name: 'productPrice'
})
export class ProductPricePipe implements PipeTransform {

  transform(product: ShopProduct): string {
    return `${product.price.toFixed(2)} ${PRICE_UNIT}`;
  }

}

@NgModule({
  declarations: [
    ProductPricePipe
  ],
  exports: [
    ProductPricePipe
  ],
  imports: [
    CommonModule
  ]
})
export class ProductPriceModule {
}
