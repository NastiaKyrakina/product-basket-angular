import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../../../models/products';
import { environment } from '../../../environments/environment';
import { IDiet } from '../../modules/calculations/models/calculations';

@Injectable({
  providedIn: 'root'
})
export class DietService {

  constructor(
    private http: HttpClient,
  ) { }

  getDiets(): Observable<Array<IDiet>> {
    return this.http.get<Array<IDiet>>(`${environment.apiURL}products/diets`);
  }
}
