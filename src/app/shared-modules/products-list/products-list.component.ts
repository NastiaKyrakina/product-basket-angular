import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { IProduct, IShopProduct } from '../../../models/products';
import { ProductAmountModule } from '../pipes/product-amount/product-amount.pipe';
import { ProductPriceModule } from '../pipes/product-price/product-amount.pipe';
import { ProductStateModule } from '../pipes/product-state/product-state.pipe';
import { ProductEnergyModule } from '../pipes/product-energy/product-amount.pipe';
import { ProductComponentModule } from '../pipes/product-component/product-amount.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { COMPARATORS_LABELS } from '../pipes/comparator/product-amount.pipe';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  @Input() name!: string;
  @Input() products: IShopProduct[] = [];
  @Input() defaultTable = true;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  removeProductConfirm(product: IShopProduct): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '380px',
      data: {
        title: 'Видалення продукт',
        text: `Ви бажаєте видалити продукт <b>'${product.name}'</b> зі списку для розрахунків?`,
        buttons: [
          {
            title: 'Скасувати',
            type: 'cancel',
          },
          {
            title: 'Видалити продукт',
            type: 'confirm',
          },
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.animal = result;
    });
  }
}

@NgModule({
  declarations: [
    ProductsListComponent
  ],
  exports: [
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    ProductAmountModule,
    ProductPriceModule,
    ProductStateModule,
    ProductEnergyModule,
    ProductComponentModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class ProductsListModule {
}
