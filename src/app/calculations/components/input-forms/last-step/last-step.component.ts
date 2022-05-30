import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { OptimizeBasketAndSetAsCurrent } from '../../../../state/baskets/current-basket/current-basket.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-last-step',
  templateUrl: './last-step.component.html',
  styleUrls: ['./last-step.component.scss']
})
export class LastStepComponent implements OnInit {

  @Output() optimizeProductsClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  optimizeProductsBasket(): void {
    this.optimizeProductsClick.emit();
  }
}
