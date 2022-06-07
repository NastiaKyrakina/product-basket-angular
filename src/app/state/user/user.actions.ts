import { ILoginBody, IRegisterBody } from '../../auth/models/auth';
import { stateNames } from '../consts/state-names';


export class InitAuthState {
  static readonly type = `[${stateNames.user}] init user state`;
  constructor() {}
}


export class LoginAction {
  static readonly type = `[${stateNames.user}] login`;
  constructor(public payload: ILoginBody) {}
}


export class RegisterUserAction {
  static readonly type = `[${stateNames.user}] register user`;
  constructor(public payload: IRegisterBody) {}
}


export class ResetUserAction {
  static readonly type = `[${stateNames.user}] reset current user`;
  constructor() {}
}
