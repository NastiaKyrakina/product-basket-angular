import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAdditionalState, IShopProduct } from '../../../../models/products';

export const PRODUCT_STATES = {
  'AI': '-',
  'BL': 'Варений',
  'BK': 'Запечений',
}

@Pipe({
  name: 'productState'
})
export class ProductStatePipe implements PipeTransform {

  transform(state: IAdditionalState): string {
    // @ts-ignore
    return PRODUCT_STATES[state.state] || '';
  }

}

@NgModule({
  declarations: [
    ProductStatePipe
  ],
  exports: [
    ProductStatePipe
  ],
  imports: [
    CommonModule
  ]
})
export class ProductStateModule {
}
