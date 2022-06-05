import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { OptimizeBasketAndSetAsCurrent } from '../../../../state/baskets/current-basket/current-basket.actions';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-last-step',
  templateUrl: './last-step.component.html',
  styleUrls: ['./last-step.component.scss']
})
export class LastStepComponent implements OnInit {

  @Input() basketForm!: FormGroup;
  @Input() energyPerDay!: number;
  @Input() userMIT!: number;
  @Output() optimizeProductsClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  optimizeProductsBasket(): void {
    this.optimizeProductsClick.emit();
  }
}
