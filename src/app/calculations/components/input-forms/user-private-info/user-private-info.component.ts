import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-private-info',
  templateUrl: './user-private-info.component.html',
  styleUrls: ['./user-private-info.component.scss']
})
export class UserPrivateInfoComponent implements OnInit {

  // @ts-ignore
  @Input() userForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
