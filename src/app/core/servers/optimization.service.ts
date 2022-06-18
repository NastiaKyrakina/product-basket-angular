import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOptimizationResult, IProductBasket, IProductBasketResponse } from '../../../models/http-api';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICalculationsState } from '../../state/baskets/calculations/calculations.state';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OptimizationService {

  constructor(
    private http: HttpClient,
  ) { }


  optimizeProductsList(formData: ICalculationsState): Observable<IOptimizationResult> {
    return this.http.post<IOptimizationResult>(`${environment.apiURL}products/optimization`, formData);
  }

  getProductsList(): Observable<IProductBasket[]> {
    return this.http.get<IProductBasketResponse[]>(`${environment.apiURL}products/optimization`)
      .pipe(
        map(res => res.map(basket => ({
          id: basket.id,
          name: basket.name,
          period: basket.period,
          maxSum: basket.max_sum,
          creationDate: basket.creation_date,
          products: JSON.parse(basket.products)
        })))
      );
  }
}
