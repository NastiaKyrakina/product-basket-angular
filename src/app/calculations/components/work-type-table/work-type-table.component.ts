import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PHYSIC_LEVELS } from '../../../core/constants/calculations';
import { PhysicalActivityLevel } from '../../models/calculations';

@Component({
  selector: 'app-work-type-table',
  templateUrl: './work-type-table.component.html',
  styleUrls: ['./work-type-table.component.scss']
})
export class WorkTypeTableComponent {

  @Input() selectedActivityLevel!: PhysicalActivityLevel;
  @Output() activityLevelSelected: EventEmitter<PhysicalActivityLevel> = new EventEmitter<PhysicalActivityLevel>();

  dataSource = PHYSIC_LEVELS;
  displayedColumns: string[] = ['icon','description'];

  onRowClick(selectedActivityLevel: PhysicalActivityLevel): void {
    this.selectedActivityLevel = selectedActivityLevel;
    this.activityLevelSelected.emit(this.selectedActivityLevel);
  }
}
