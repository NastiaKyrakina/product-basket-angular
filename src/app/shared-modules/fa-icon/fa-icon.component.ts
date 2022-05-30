import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FA_ICONS } from '../../core/constants/icons';

@Component({
  selector: 'app-fa-icon',
  templateUrl: './fa-icon.component.html',
  styleUrls: ['./fa-icon.component.scss']
})
export class FaIconComponent implements OnInit {

  @Input() name!: string;
  @Input() size = 2;


  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [
    FaIconComponent
  ],
  exports: [
    FaIconComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FaIconModule {
}
