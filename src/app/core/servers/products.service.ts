import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ICategory, IProduct, IRestriction, IShopProduct, ShopProduct } from '../../../models/products';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private http: HttpClient,
  ) { }

  getCategories(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(`${environment.apiURL}products/categories`);
  }

  getProducts(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${environment.apiURL}products/products`);
  }

  getShopProducts(): Observable<Array<IShopProduct>> {
    return this.http.get<Array<IShopProduct>>(`${environment.apiURL}products/shop-products`);
  }

  getRestrictions(): Observable<Array<IRestriction>> {
    return this.http.get<Array<IRestriction>>(`${environment.apiURL}products/restrictions`);
  }

  getProductsByCategories(): Observable<Record<string, ShopProduct[]>> {
    return this.getShopProducts()
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
