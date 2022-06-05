import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOptimizationResponse } from '../../../models/http-api';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICalculationsState } from '../../state/baskets/calculations/calculations.state';

@Injectable({
  providedIn: 'root'
})
export class OptimizationService {

  constructor(
    private http: HttpClient,
  ) { }


  optimizeProductsList(formData: ICalculationsState): Observable<IOptimizationResponse> {
    return this.http.post<IOptimizationResponse>(`${environment.apiURL}products/optimization`, formData);
  }
}
