import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestrictionsRoutingModule } from './restrictions-routing.module';
import { RestrictionsComponent } from './pages/restrictions.component';
import { RestrictionsTableComponent } from './components/restrictions-table/restrictions-table.component';
import { RestrictionsFormComponent } from './components/restrictions-form/restrictions-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ComparatorModule } from '../shared-modules/pipes/comparator/product-amount.pipe';


@NgModule({
  declarations: [
    RestrictionsComponent,
    RestrictionsTableComponent,
    RestrictionsFormComponent
  ],
    imports: [
        CommonModule,
        RestrictionsRoutingModule,
        MatTableModule,
        MatSortModule,
        ComparatorModule
    ]
})
export class RestrictionsModule { }
