import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDialogData } from './models';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory, IShopProduct } from '../../../../../models/products';
import { UNIT_OPTIONS } from './consts';
import { ProductsService } from '../../../../core/servers/products.service';
import { PRODUCT_STATES } from '../../../../shared-modules/pipes/product-state/product-state.pipe';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  readonly DEFAULT_UNIT = 'г';
  readonly UNIT_OPTIONS = UNIT_OPTIONS;
  readonly PRODUCT_STATES = PRODUCT_STATES;

  action: 'Add' | 'Edit' = 'Add';
  productForm!: FormGroup;
  productStatesArray: FormArray = new FormArray([]);
  categories: ICategory[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData,
    private productsService: ProductsService,
    private fb: FormBuilder,
  ) {
    this.action = data.product ? 'Edit' : 'Add';
    this.createProductForm(data.product);
  }

  ngOnInit(): void {
    this.getCategories();
    this.addProductState();
  }

  getCategories(): void {
    this.productsService
      .getCategories()
      .subscribe(categories => this.categories = categories)
  }

  createProductForm(product?: IShopProduct): void {
    this.productForm = this.fb.group({
      category: [product?.product.category.id || '', [Validators.required]],
      name: [product?.name || '', [Validators.required]],
      price: [product?.price || 0, [Validators.required]],
      amount: [product?.amount || 100, [Validators.required]],
      unit: [product?.unit || this.DEFAULT_UNIT, [Validators.required]],
      states: this.productStatesArray,
    });
  }

  addProductState(): void {
    this.productStatesArray.push(this.getProductState());
  }

  getProductState(): FormGroup {
    return this.fb.group({
      state: [''],
      energy: [0, [Validators.required]],
      proteins: [0, [Validators.required]],
      fats: [0, [Validators.required]],
      carbohydrates:[0, [Validators.required]],
    });
  }
}
