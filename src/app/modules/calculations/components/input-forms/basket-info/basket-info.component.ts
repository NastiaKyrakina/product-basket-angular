import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FA_ICONS } from '../../../../../core/constants/icons';

@Component({
  selector: 'app-basket-info',
  templateUrl: './basket-info.component.html',
  styleUrls: ['./basket-info.component.scss']
})
export class BasketInfoComponent {

  readonly FA_ICONS = FA_ICONS;

  // @ts-ignore
  @Input() basketForm: FormGroup;

}
