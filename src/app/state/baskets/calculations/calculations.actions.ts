import { stateNames } from '../../consts/state-names';
import { IProductBasketResult } from '../../../../models/http-api';
import { ICalculations, IUserParams } from '../../../modules/calculations/models/calculations';

export class InitBasketState {
  static readonly type = `[${stateNames.calculations}] init calculations state`;
}

export class SetBasketFormData {
  static readonly type = `[${stateNames.calculations}] set basket form data`;
  constructor(public payload: ICalculations) {}
}

export class SetUserCalcData {
  static readonly type = `[${stateNames.calculations}] set userC calc data`;
  constructor(public payload: IUserParams) {}
}

export class ResetFormData {
  static readonly type = `[${stateNames.calculations}] reset basket form data`;
}
