import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOptimizationResponse } from '../../../models/http-api';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OptimizationService {

  constructor(
    private http: HttpClient,
  ) { }


  optimizeProductsList(): Observable<IOptimizationResponse> {
    return this.http.get<IOptimizationResponse>(`${environment.apiURL}products/optimization`);
  }
}
