import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDiet } from '../../../models/calculations';
import { ICategory } from '../../../../../../models/products';

@Component({
  selector: 'app-diet-select-block',
  templateUrl: './diet-select-block.component.html',
  styleUrls: ['./diet-select-block.component.scss']
})
export class DietSelectBlockComponent {

  // @ts-ignore
  @Input() dietForm: FormGroup;
  @Input() diets: IDiet[] = [];
  @Input() categories: ICategory[] = [];
  displayedColumns: string[] = ['name','description'];

  selectWorkType(dietType: number): void {
    this.dietForm.get('dietId')?.setValue(dietType);
    if (dietType === 7) {
      const categoriesToExclude = this.dietForm.get('categoriesToExclude')?.value as number[] || [];
      categoriesToExclude.push(3);
      this.dietForm.get('categoriesToExclude')?.setValue(categoriesToExclude);
    }
  }
}
