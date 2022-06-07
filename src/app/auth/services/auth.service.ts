import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICalculationsState } from '../../state/baskets/calculations/calculations.state';
import { Observable } from 'rxjs';
import { IOptimizationResponse } from '../../../models/http-api';
import { environment } from '../../../environments/environment';
import { ILoginBody, ILoginResponse, IRegisterBody } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  login(authData: ILoginBody): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${environment.apiURL}auth/login/`, authData);
  }

  registerUser(authData: IRegisterBody): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${environment.apiURL}auth/registration/`, authData);
  }
}
