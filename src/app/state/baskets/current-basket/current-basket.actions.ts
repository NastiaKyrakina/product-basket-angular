import { stateNames } from '../../consts/state-names';
import { IOptimizationResponse } from '../../../../models/http-api';

export class InitBasketState {
  static readonly type = `[${stateNames.currentBasket}] init basket state`;
  constructor(public payload?: { basketID: number; }) {}
}

export class OptimizeBasketAndSetAsCurrent {
  static readonly type = `[${stateNames.currentBasket}] optimize basket and set as current`;
  constructor(public payload: any) {}
}

export class SetAsCurrentBasket {
  static readonly type = `[${stateNames.currentBasket}] set basket as current`;
  constructor(public payload: IOptimizationResponse) {}
}