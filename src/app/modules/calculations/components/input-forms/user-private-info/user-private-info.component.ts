import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Sex } from '../../../models/calculations';

@Component({
  selector: 'app-user-private-info',
  templateUrl: './user-private-info.component.html',
  styleUrls: ['./user-private-info.component.scss']
})
export class UserPrivateInfoComponent implements OnInit {

  readonly Sex = Sex;

  // @ts-ignore
  @Input() userForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
