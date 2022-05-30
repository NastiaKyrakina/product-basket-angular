import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconModule } from '../fa-icon/fa-icon.component';

@Component({
  selector: 'app-control-wrapper',
  templateUrl: './control-wrapper.component.html',
  styleUrls: ['./control-wrapper.component.scss']
})
export class ControlWrapperComponent implements OnInit {

  @Input() name!: string;

  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [
    ControlWrapperComponent
  ],
  exports: [
    ControlWrapperComponent
  ],
  imports: [
    CommonModule,
    FaIconModule
  ]
})
export class ControlWrapperModule {
}
