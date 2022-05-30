import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './pages/products.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProductAmountModule } from '../shared-modules/pipes/product-amount/product-amount.pipe';
import { ProductPriceModule } from '../shared-modules/pipes/product-price/product-amount.pipe';
import { ProductEnergyModule } from '../shared-modules/pipes/product-energy/product-amount.pipe';
import { ProductComponentModule } from '../shared-modules/pipes/product-component/product-amount.pipe';
import { FaIconModule } from '../shared-modules/fa-icon/fa-icon.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlWrapperModule } from '../shared-modules/conrol-wrapper/control-wrapper.component';
import { MatSelectModule } from '@angular/material/select';
import { ProductStateModule } from '../shared-modules/pipes/product-state/product-state.pipe';
import { ProductsListModule } from '../shared-modules/products-list/products-list.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsTableComponent,
    ProductDialogComponent
  ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        MatExpansionModule,
        ProductAmountModule,
        ProductPriceModule,
        ProductEnergyModule,
        ProductComponentModule,
        FaIconModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        ControlWrapperModule,
        MatSelectModule,
        ProductStateModule,
        ProductsListModule
    ]
})
export class ProductsModule { }
