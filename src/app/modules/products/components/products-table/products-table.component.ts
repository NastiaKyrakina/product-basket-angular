import { Component, Input } from '@angular/core';
import { IShopProduct, ShopProduct } from '../../../../../models/products';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent {

  @Input() products: ShopProduct[] = [];
  @Input() productsByCategories: Record<string, ShopProduct[]> = {};
}
