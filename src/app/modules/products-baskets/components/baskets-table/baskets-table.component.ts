import { Component, Input, OnInit } from '@angular/core';
import { IProductBasket } from '../../../../../models/http-api';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../../../../shared-modules/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { RemoveBaskets } from '../../../../state/baskets/baskets-list/current-basket.actions';

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

  displayedColumns: string[] = ['name', 'period', 'maxSum', 'creationDate', 'actions'];
  tableData: MatTableDataSource<IProductBasket> = new MatTableDataSource<IProductBasket>([]);
  constructor(
    public dialog: MatDialog,
    private store: Store,
  ) { }

  ngOnInit(): void {
  }

  // navigateToBasket(row) {
  //
  // }
  removeBasket(element: IProductBasket): void {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '380px',
        data: {
          title: 'Видалення продуктового кошика',
          text: `Ви бажаєте видалити кошик <b>'${element.name}'</b> зі списку?`,
          buttons: [
            {
              title: 'Скасувати',
              type: 'cancel',
            },
            {
              title: 'Видалити кошик',
              type: 'confirm',
            },
          ]
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        if (result.type === 'confirm') {
          this.store.dispatch(new RemoveBaskets(element.id));
        }
      });
  }
}
