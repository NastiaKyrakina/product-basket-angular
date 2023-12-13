import { IChangePasswordBody, ILoginBody, IRegisterBody } from '../../modules/auth/models/auth';
import { stateNames } from '../consts/state-names';
import { IUserParams } from '../../modules/calculations/models/calculations';


export class InitAuthState {
  static readonly type = `[${stateNames.user}] init user state`;
  constructor() {}
}


export class LoginAction {
  static readonly type = `[${stateNames.user}] login`;
  constructor(public payload: ILoginBody) {}
}

export class LogoutAction {
  static readonly type = `[${stateNames.user}] logout`;
  constructor() {}
}

export class RefreshTokenAction {
  static readonly type = `[${stateNames.user}] refresh token`;
  constructor() {}
}

export class ChangePasswordAction {
  static readonly type = `[${stateNames.user}] change password`;
  constructor(public payload: IChangePasswordBody) {}
}

export class RegisterUserAction {
  static readonly type = `[${stateNames.user}] register user`;
  constructor(public payload: { user: IRegisterBody, calculations: IUserParams }) {}
}

export class SaveUserCalcDataAction {
  static readonly type = `[${stateNames.user}] save user calc data`;
  constructor(public payload: IUserParams) {}
}

export class GetUserCalcDataAction {
  static readonly type = `[${stateNames.user}] get user calc data`;
  constructor() {}
}

export class ResetUserAction {
  static readonly type = `[${stateNames.user}] reset current user`;
  constructor() {}
}
