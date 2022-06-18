import { Component, Input, OnInit } from '@angular/core';
import { IProductBasket } from '../../../../../models/http-api';
import { MatTableDataSource } from '@angular/material/table';
import { IRestriction } from '../../../../../models/products';

@Component({
  selector: 'app-baskets-table',
  templateUrl: './baskets-table.component.html',
  styleUrls: ['./baskets-table.component.scss']
})
export class BasketsTableComponent implements OnInit {

  @Input() set userBaskets (userBaskets: IProductBasket[] | null) {
    this.tableData = new MatTableDataSource(userBaskets || []);
    // this.tableData.sort = this.sort;
  };

  displayedColumns: string[] = ['name', 'period', 'maxSum', 'creationDate'];
  tableData: MatTableDataSource<IProductBasket> = new MatTableDataSource<IProductBasket>([]);
  constructor() { }

  ngOnInit(): void {
  }

  // navigateToBasket(row) {
  //
  // }
}
