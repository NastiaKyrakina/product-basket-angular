import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'formGroup'
})
export class FormGroupPipe implements PipeTransform {

  transform(value: AbstractControl, ...args: unknown[]): FormGroup {
    return value as unknown as FormGroup;
  }

}
