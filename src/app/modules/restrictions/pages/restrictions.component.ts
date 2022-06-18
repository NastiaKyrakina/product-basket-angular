import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/servers/products.service';
import { IRestriction } from '../../../../models/products';

@Component({
  selector: 'app-restrictions',
  templateUrl: './restrictions.component.html',
  styleUrls: ['./restrictions.component.scss']
})
export class RestrictionsComponent implements OnInit {

  restrictions: IRestriction[] = [];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productsService.getRestrictions()
      .subscribe(restrictions => this.restrictions = restrictions);
  }

}
