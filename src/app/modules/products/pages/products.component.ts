import { Component, OnInit } from '@angular/core';
import { IShopProduct, ShopProduct } from '../../../../models/products';
import { FA_ICONS } from '../../../core/constants/icons';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from '../components/product-dialog/product-dialog.component';
import { ProductsService } from '../../../core/servers/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  readonly ICONS = FA_ICONS;

  products: IShopProduct[] = [];
  productsByCategories: Record<string, ShopProduct[]> = {};
  query = '';

  constructor(
    public dialog: MatDialog,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsService.getProductsByCategories()
      .subscribe(productsByCategories => this.productsByCategories = productsByCategories);
  }

  onSearch(event: Event) {
    this.query = (event.target as HTMLInputElement).value;
  }

  resetSearch() {
    this.query = '';
  }

  openAddProductDialog() {
    this.dialog.open<ProductDialogComponent>(ProductDialogComponent, {
      data: {
        product: null,
      },
    });
  }
}
