import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivityLevel } from '../../../models/calculations';

@Component({
  selector: 'app-user-work-info',
  templateUrl: './user-work-info.component.html',
  styleUrls: ['./user-work-info.component.scss']
})
export class UserWorkInfoComponent {

  // @ts-ignore
  @Input() userForm: FormGroup;

  selectWorkType(workType: ActivityLevel): void {
    this.userForm.get('activityLevel')?.patchValue(workType)
  }
}
