import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICalculationsState } from '../../../state/baskets/calculations/calculations.state';
import { Observable } from 'rxjs';
import { IOptimizationResult } from '../../../../models/http-api';
import { environment } from '../../../../environments/environment';
import { ILoginBody, ILoginResponse, IRegisterBody, IUser } from '../models/auth';
import { ICalculationsUser, PhysicalActivityLevel, Sex } from '../../calculations/models/calculations';
import { map } from 'rxjs/operators';

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

  getUser(): Observable<IUser> {
    return this.http.get<IUser>(`${environment.apiURL}auth/user`);
  }

  addUserCalcData(calculationsUserData: ICalculationsUser): Observable<ICalculationsUser> {
    const body = {
      sex: calculationsUserData.sex,
      years: calculationsUserData.years,
      height: calculationsUserData.height,
      weight: calculationsUserData.weight,
      activity_level: calculationsUserData.activityLevel,
    };
    return this.http.post<any>(`${environment.apiURL}products/user`, body)
      .pipe(
        map(data => ({...data, activityLevel: data.activity_level}))
      );
  }

  getUserCalcData(): Observable<ICalculationsUser> {
    return this.http.get<any>(`${environment.apiURL}products/user`)
      .pipe(
        map(data => ({...data, activityLevel: data.activity_level}))
      );
  }

  registerUser(authData: IRegisterBody): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${environment.apiURL}auth/registration/`, authData);
  }
}