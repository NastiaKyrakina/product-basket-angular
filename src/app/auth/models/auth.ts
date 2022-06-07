
export interface ILoginBody {
  username?: string;
  email?: string;
  password: string;
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

export interface IUser {
  pk: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}
