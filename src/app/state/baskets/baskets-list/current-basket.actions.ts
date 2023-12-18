import { stateNames } from '../../consts/state-names';

export class GetUserBaskets {
  static readonly type = `[${stateNames.currentBasket}] get user baskets`;
  constructor() {}
}

export class RemoveBaskets {
  static readonly type = `[${stateNames.currentBasket}] remove baskets`;
  constructor(public payload: number) {}
}
