import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WORK_TYPE_DESCRIPTION } from '../../../core/constants/calculations';

@Component({
  selector: 'app-work-type-table',
  templateUrl: './work-type-table.component.html',
  styleUrls: ['./work-type-table.component.scss']
})
export class WorkTypeTableComponent {

  @Input() selectedWorkType!: string;
  @Output() workTypeSelected: EventEmitter<string> = new EventEmitter<string>();

  dataSource = WORK_TYPE_DESCRIPTION;
  displayedColumns: string[] = ['title', 'description'];

  onRowClick(selectedWorkType: string): void {
    console.log(selectedWorkType)
    this.selectedWorkType = selectedWorkType;
    this.workTypeSelected.emit(this.selectedWorkType);
  }
}
