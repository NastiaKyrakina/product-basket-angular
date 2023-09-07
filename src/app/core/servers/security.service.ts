import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../../../models/products';
import { environment } from '../../../environments/environment';


export interface IQuestion {
  id: string;
  question: string;
  answer?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(
    private http: HttpClient,
  ) { }

  getQuestions(count = 4): Observable<Array<IQuestion>> {
    return this.http.get<Array<IQuestion>>(`${environment.apiURL}products/security/questions`);
  }

  sendAnswers(answers: IQuestion[]): Observable<Array<IQuestion>> {
    return this.http.post<Array<IQuestion>>(`${environment.apiURL}products/security/questions`, {answers});
  }
}
