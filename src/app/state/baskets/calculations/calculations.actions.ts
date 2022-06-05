import { stateNames } from '../../consts/state-names';
import { IOptimizationResponse } from '../../../../models/http-api';
import { ICalculations } from '../../../calculations/models/calculations';

export class InitBasketState {
  static readonly type = `[${stateNames.calculations}] init calculations state`;
}

export class SetBasketFormData {
  static readonly type = `[${stateNames.calculations}] set basket form data`;
  constructor(public payload: ICalculations) {}
}

export class ResetFormData {
  static readonly type = `[${stateNames.calculations}] reset basket form data`;
}
