import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAdditionalState, IShopProduct } from '../../../../models/products';

const COMPONENT_UNIT = 'г'

@Pipe({
  name: 'productComponent'
})
export class ProductComponentPipe implements PipeTransform {

  transform(product: IAdditionalState, component: 'fats' | 'proteins' | 'carbohydrates'): string {
    return `${product[component]} ${COMPONENT_UNIT}`;
  }

}

@NgModule({
  declarations: [
    ProductComponentPipe
  ],
  exports: [
    ProductComponentPipe
  ],
  imports: [
    CommonModule
  ]
})
export class ProductComponentModule {
}
