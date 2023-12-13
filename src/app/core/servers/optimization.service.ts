import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductBasketResult, IProductBasket, IProductBasketResponse } from '../../../models/http-api';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICalculationsState } from '../../state/baskets/calculations/calculations.state';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OptimizationService {

  constructor(
    private http: HttpClient,
  ) { }


  // Optimize Products List by user input
  getOptimizationResults(body: ICalculationsState): Observable<IProductBasketResult> {
    return this.http.post<IProductBasketResult>(`${environment.apiURL}products/optimization`, body);
  }

  // Get Product Basket by ID
  getProductBasket(id: number): Observable<IProductBasket> {
    return this.http.get<any>(`${environment.apiURL}products/product-backet/${id}`)
      .pipe(
        map(basket => ({
          id: basket.id,
          name: basket.name,
          period: basket.period,
          maxSum: basket['max_sum'],
          creationDate: basket['creation_date'],
          products: JSON.parse(basket.products)
        }))
      );
  }

  // Get current user Product Baskets
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
  // Get Product Baskets as File
  getProductAsFile(id: number, downloadAsFile: string): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}products/product-backet/${id}?downloadAsFile=${downloadAsFile}`, {
      responseType: 'blob' as "json"
    });
  }
}
