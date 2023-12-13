import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PHYSIC_LEVELS } from '../../../../core/constants/calculations';
import { ActivityLevel } from '../../models/calculations';

@Component({
  selector: 'app-work-type-table',
  templateUrl: './work-type-table.component.html',
  styleUrls: ['./work-type-table.component.scss']
})
export class WorkTypeTableComponent {

  @Input() selectedActivityLevel!: ActivityLevel;
  @Output() activityLevelSelected: EventEmitter<ActivityLevel> = new EventEmitter<ActivityLevel>();

  dataSource = PHYSIC_LEVELS;
  displayedColumns: string[] = ['icon','description'];

  onRowClick(selectedActivityLevel: ActivityLevel): void {
    this.selectedActivityLevel = selectedActivityLevel;
    this.activityLevelSelected.emit(this.selectedActivityLevel);
  }
}
