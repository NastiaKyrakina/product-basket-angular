import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IRestriction } from '../../../../../models/products';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared-modules/confirm-dialog/confirm-dialog.component';
import { COMPARATORS_LABELS } from '../../../../shared-modules/pipes/comparator/product-amount.pipe';

@Component({
  selector: 'app-restrictions-table',
  templateUrl: './restrictions-table.component.html',
  styleUrls: ['./restrictions-table.component.scss']
})
export class RestrictionsTableComponent {

  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  @Input() set restrictions (restrictions: IRestriction[]) {
    this.tableData = new MatTableDataSource(restrictions);
    this.tableData.sortingDataAccessor = (obj, property) => this.nestedProperty(obj, property);
    this.tableData.sort = this.sort;
  };

  displayedColumns: string[] = ['product.name','comparator', 'value', 'action'];

  tableData: MatTableDataSource<IRestriction> = new MatTableDataSource<IRestriction>([]);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
  ) {}

  nestedProperty = (data: any, sortHeaderId: string): string | number => {
    return sortHeaderId
      .split('.')
      .reduce((acc, key) => acc && acc[key], data) as string | number;
  }

  removeRestrictionConfirm(restriction: IRestriction): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '380px',
      data: {
        title: 'Видалення обмеження',
        text: `Видалити обмеження <b>'${COMPARATORS_LABELS[restriction.comparator]} ${restriction.amount} ${restriction.unit} на добу'</b> для продукту <b>'${restriction.product.name}</b>'?`,
        buttons: [
          {
            title: 'Скасувати',
            type: 'cancel',
          },
          {
            title: 'Видалити обмеження',
            type: 'confirm',
          },
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.animal = result;
    });
  }

  editRestrictionConfirm(restriction: IRestriction): void {
    console.log(restriction.comparator, COMPARATORS_LABELS[restriction.comparator])
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '380px',
      data: {
        title: 'Редагувати обмеження',
        text: `Ви бажаєте відредагувати обмеження <b>'${COMPARATORS_LABELS[restriction.comparator]} ${restriction.amount} ${restriction.unit} на добу'</b> для продукту <b>'${restriction.product.name}</b>'?`,
        buttons: [
          {
            title: 'Скасувати',
            type: 'cancel',
          },
          {
            title: 'Редагувати обмеження',
            type: 'confirm',
          },
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.animal = result;
    });
  }
}
