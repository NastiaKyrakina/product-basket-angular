import { Component, OnInit } from '@angular/core';
import { ProductsService } from './core/servers/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'product-basket';

  constructor(
    private productsService: ProductsService
  ) {
  }

  ngOnInit(): void {

  }
}
