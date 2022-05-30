import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDialogData } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IShopProduct } from '../../../../models/products';
import { UNIT_OPTIONS } from './consts';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  readonly DEFAULT_UNIT = 'г';
  readonly UNIT_OPTIONS = UNIT_OPTIONS;

  action: 'Add' | 'Edit' = 'Add';
  productForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData,
    private fb: FormBuilder,
  ) {
    this.action = data.product ? 'Edit' : 'Add';
    this.createProductForm(data.product);
  }

  ngOnInit(): void {
  }

  createProductForm(product?: IShopProduct): void {
    this.productForm = this.fb.group({
      name: [product?.name || '', [Validators.required]],
      price: [product?.price || 0, [Validators.required]],
      amount: [product?.amount || 100, [Validators.required]],
      unit: [product?.unit || this.DEFAULT_UNIT, [Validators.required]]
    });
  }
}
