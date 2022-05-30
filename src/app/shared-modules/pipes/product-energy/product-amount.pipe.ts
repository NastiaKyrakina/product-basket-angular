import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAdditionalState, IShopProduct } from '../../../../models/products';

const ENERGY_UNIT = 'ккал'

@Pipe({
  name: 'productEnergy'
})
export class ProductEnergyPipe implements PipeTransform {

  transform(product: IAdditionalState): string {
    return `${product.energy} ${ENERGY_UNIT}`;
  }

}

@NgModule({
  declarations: [
    ProductEnergyPipe
  ],
  exports: [
    ProductEnergyPipe
  ],
  imports: [
    CommonModule
  ]
})
export class ProductEnergyModule {
}
