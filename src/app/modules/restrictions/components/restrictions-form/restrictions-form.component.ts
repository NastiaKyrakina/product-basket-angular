import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UNIT_OPTIONS } from 'src/app/modules/products/components/product-dialog/consts';
import { Comparators, IProduct, IRestriction } from '../../../../../models/products';
import { ProductsService } from '../../../../core/servers/products.service';

@Component({
  selector: 'app-restrictions-form',
  templateUrl: './restrictions-form.component.html',
  styleUrls: ['./restrictions-form.component.scss']
})
export class RestrictionsFormComponent implements OnInit {
  readonly Comparators = Object.values(Comparators);
  readonly UNIT_OPTIONS = UNIT_OPTIONS;
  @Input() restrictionForEdit!: IRestriction;

  restrictionsForm!: FormGroup;
  productList: IProduct[] = [];
  filteredList: IProduct[] = [];

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,

  ) { }

  ngOnInit(): void {
    this.createRestrictionsForm();
    this.getProducts();
  }

  getProducts(): void {
    this.productsService.getProducts()
      .subscribe(products => {
        this.productList = products;
        this.filteredList = this.productList;
      });
  }

  createRestrictionsForm(): void {
    this.restrictionsForm = this.fb.group({
      product: [null, [Validators.required]],
      comparators: [Comparators.LT, [Validators.required]],
      amount: [500, [Validators.required, Validators.min(0)]],
      unit: ['гр', [Validators.required]],
    });
  }

  onKey(event: KeyboardEvent): void {
    const query = (event.target as unknown as { value: string }).value;
    this.filteredList = query ? this.filterProducts(query.toLowerCase()) : this.productList;
  }

  filterProducts(query: string): IProduct[] {
    return this.productList.filter(product => product.name.toLowerCase().includes(query))
  }

}
