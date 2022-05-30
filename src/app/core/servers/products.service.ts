import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IShopProduct, ShopProduct } from '../../../models/products';
import { map } from 'rxjs/operators';
import { IOptimizationResponse } from '../../../models/http-api';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private http: HttpClient,
  ) { }

  getCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${environment.apiURL}products/categories`);
  }

  getProducts(): Observable<Array<IShopProduct>> {
    return this.http.get<Array<IShopProduct>>(`${environment.apiURL}products/shop-products`);
  }

  getProductsByCategories(): Observable<Record<string, ShopProduct[]>> {
    return this.getProducts()
      .pipe(
        map(products => {
          const categoryMap = {};
          products.forEach(product => {
            // @ts-ignore
            categoryMap[product.product.category.name] = categoryMap[product.product.category.name] || [];
            // @ts-ignore
            categoryMap[product.product.category.name] = [...categoryMap[product.product.category.name], product];
          })
          console.log(categoryMap)
          return categoryMap;
        })
      );
  }

}
