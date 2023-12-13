import { IUserParams } from '../../calculations/models/calculations';

export interface ILoginBody {
  username?: string;
  email?: string;
  password: string;
}

export interface IChangePasswordBody {
  old_password: string;
  new_password1: string;
  new_password2: string;
}

export interface IRegisterBody {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
  user: IUser;
}

export interface IChangePasswordResponse {
  detail: string;
}

export interface IUser {
  pk: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}
