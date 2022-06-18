import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { IUser } from '../../modules/auth/models/auth';
import {
  GetUserCalcDataAction,
  InitAuthState,
  LoginAction,
  RegisterUserAction,
  ResetUserAction,
  SaveUserCalcDataAction
} from './user.actions';
import { AuthService } from '../../modules/auth/services/auth.service';
import { stateNames } from '../consts/state-names';
import { LocalStorageService } from '../../core/servers/local-storage.service';
import { SetUserCalcData } from '../baskets/calculations/calculations.actions';

export interface IUserState {
  user: IUser | null;
}

const DefaultUserState: IUserState = {
  user: null,
};


@State<IUserState>({
  name: stateNames.user,
  defaults: DefaultUserState
})
@Injectable()
export class UserState {

  static accessToken: string | null;

  @Selector()
  static user(state: IUserState): IUser | null {
    return state.user;
  }

  @Selector()
  static isAuthUser(state: IUserState): boolean {
    return !!(state.user || UserState.accessToken);
  }

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private store: Store,
  ) {
    this.getToken();
  }

  @Action(InitAuthState)
  initAuthState(ctx: StateContext<IUserState>): Observable<any> {
   return this.authService.getUser()
     .pipe(
       tap(user => ctx.patchState({user})),
       tap(() =>  ctx.dispatch(new GetUserCalcDataAction())),
     );
  }

  @Action(LoginAction)
  login(ctx: StateContext<IUserState>, action: LoginAction): Observable<any> {
    return this.authService.login(action.payload)
      .pipe(tap(res => {
        this.saveToken(res.access_token);
        ctx.patchState({user: res.user});
      }))
  }

  @Action(RegisterUserAction)
  registerUser(ctx: StateContext<IUserState>, action: RegisterUserAction): Observable<any> {
    return this.authService.registerUser(action.payload.user)
      .pipe(
        tap(res => {
          this.saveToken(res.access_token);
          this.saveUser(res.user)
          ctx.patchState({user: res.user});
        }),
        tap(res => ctx.dispatch(new SaveUserCalcDataAction(action.payload.calculations)))
      )
  }

  @Action(SaveUserCalcDataAction)
  saveUserCalcData(ctx: StateContext<IUserState>, action: SaveUserCalcDataAction): Observable<any> {
    return this.authService.addUserCalcData(action.payload)
      .pipe(tap(res => ctx.dispatch(new SetUserCalcData(res))))
  }

  @Action(GetUserCalcDataAction)
  getUserCalcData(ctx: StateContext<IUserState>): Observable<any> {
    return this.authService.getUserCalcData()
      .pipe(tap(res => ctx.dispatch(new SetUserCalcData(res))))
  }

  @Action(ResetUserAction)
  resetUserAction(ctx: StateContext<IUserState>, action: ResetUserAction): void {
    ctx.patchState({user: null});
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }

  saveToken(accessToken: string): void {
    UserState.accessToken = accessToken;
    this.localStorageService.set('accessToken', UserState.accessToken);
  }

  saveUser(user: IUser): void {
    this.localStorageService.set('user', user);
  }

  getUser(): IUser | null {
    return this.localStorageService.get<IUser>('user');
  }

  getToken(): string | null {
    if (UserState.accessToken) {
      return UserState.accessToken;
    }
    return UserState.accessToken = this.localStorageService.get<string>('accessToken');
  }
}
