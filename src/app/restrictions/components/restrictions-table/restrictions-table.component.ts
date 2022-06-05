import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IRestrictions } from '../../../../models/products';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-restrictions-table',
  templateUrl: './restrictions-table.component.html',
  styleUrls: ['./restrictions-table.component.scss']
})
export class RestrictionsTableComponent implements AfterViewInit {

  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  @Input() set restrictions (restrictions: IRestrictions[]) {
    this.tableData = new MatTableDataSource(restrictions);
    this.tableData.sort = this.sort;
  };

  displayedColumns: string[] = ['product','comparator', 'value'];

  tableData: MatTableDataSource<IRestrictions> = new MatTableDataSource<IRestrictions>([]);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngAfterViewInit() {
    this.tableData.sort = this.sort;
  }

  sortChanged(sort: Sort) {
    console.log(sort)
    // this.tableData.sortingDataAccessor()
  }
}
