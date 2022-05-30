import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconModule } from '../fa-icon/fa-icon.component';

@Component({
  selector: 'app-deck-row',
  templateUrl: './deck-row.component.html',
  styleUrls: ['./deck-row.component.scss']
})
export class DeckRow {
}

@NgModule({
  declarations: [
    DeckRow
  ],
  exports: [
    DeckRow
  ],
  imports: [
    CommonModule,
    FaIconModule
  ]
})
export class DeckRowModule {
}
