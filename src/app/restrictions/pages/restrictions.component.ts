import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/servers/products.service';
import { IRestrictions } from '../../../models/products';

@Component({
  selector: 'app-restrictions',
  templateUrl: './restrictions.component.html',
  styleUrls: ['./restrictions.component.scss']
})
export class RestrictionsComponent implements OnInit {

  restrictions: IRestrictions[] = [];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productsService.getRestrictions()
      .subscribe(restrictions => this.restrictions = restrictions);
  }

}
