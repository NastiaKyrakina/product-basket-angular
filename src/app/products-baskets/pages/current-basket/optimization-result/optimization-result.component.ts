import { Component, Input, OnInit } from '@angular/core';
import { IOptimizationGeneral } from '../../../../../models/optimization';

@Component({
  selector: 'app-optimization-result',
  templateUrl: './optimization-result.component.html',
  styleUrls: ['./optimization-result.component.scss']
})
export class OptimizationResultComponent implements OnInit {

  @Input() general!: IOptimizationGeneral | null;

  constructor() { }

  ngOnInit(): void {
  }

}
