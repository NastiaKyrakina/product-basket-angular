import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comparators } from '../../../../models/products';

const COMPARATORS_LABELS = {
  [Comparators.LT]: 'Меньше ніж',
  [Comparators.GT]: 'Більше ніж',
  [Comparators.EQ]: 'Рівно',
}

@Pipe({
  name: 'comparator'
})
export class ComparatorPipe implements PipeTransform {

  transform(comparator: Comparators): string {
    return COMPARATORS_LABELS[comparator];
  }

}

@NgModule({
  declarations: [
    ComparatorPipe
  ],
  exports: [
    ComparatorPipe
  ],
  imports: [
    CommonModule
  ]
})
export class ComparatorModule {
}
