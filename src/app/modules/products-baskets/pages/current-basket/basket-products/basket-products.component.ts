import { Component, Input, OnInit } from '@angular/core';
import { IShopProduct } from '../../../../../../models/products';
import { FA_ICONS } from '../../../../../core/constants/icons';
import { OptimizationService } from '../../../../../core/servers/optimization.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-basket-products',
  templateUrl: './basket-products.component.html',
  styleUrls: ['./basket-products.component.scss'],
})
export class BasketProductsComponent implements OnInit {
  readonly ICONS = FA_ICONS;
  readonly DOWNLOAD_FORMATS = ['pdf', 'txt', 'doc', 'exel'];

  @Input() products: IShopProduct[] = [];
  @Input() id!: number;

  constructor(
    private optimizationService: OptimizationService,
  ) { }

  ngOnInit(): void {
  }

  printList(): void {
    window.print();
  }

  downloadFile(format: string): void {
    this.optimizationService.getProductAsFile(this.id, format)
      .subscribe(res => {
        const blob = new Blob([res], { type : 'application/vnd.ms.excel' });
        const file = new File([blob], 'test' + '.xlsx', { type: 'application/vnd.ms.excel' });
        saveAs(file);
      });
  }
}
