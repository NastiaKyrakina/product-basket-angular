import { Component, Input, OnInit } from '@angular/core';
import { IShopProduct } from '../../../../../../models/products';
import { FA_ICONS } from '../../../../../core/constants/icons';

@Component({
  selector: 'app-basket-products',
  templateUrl: './basket-products.component.html',
  styleUrls: ['./basket-products.component.scss'],
})
export class BasketProductsComponent implements OnInit {
  readonly ICONS = FA_ICONS;
  readonly DOWNLOAD_FORMATS = ['pdf', 'txt', 'doc', 'exel'];

  @Input() products: IShopProduct[] = [];

  constructor(
  ) { }

  ngOnInit(): void {
  }

  printList(): void {
    window.print();
  }
}
