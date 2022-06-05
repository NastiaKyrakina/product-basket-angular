import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculationsRoutingModule } from './calculations-routing.module';
import { CalculationsComponent } from './pages/calculations-page/calculations.component';
import { InputFormsComponent } from './components/input-forms/input-forms.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BasketInfoComponent } from './components/input-forms/basket-info/basket-info.component';
import { UserPrivateInfoComponent } from './components/input-forms/user-private-info/user-private-info.component';
import { UserWorkInfoComponent } from './components/input-forms/user-work-info/user-work-info.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ControlWrapperModule } from '../shared-modules/conrol-wrapper/control-wrapper.component';
import { MatTableModule } from '@angular/material/table';
import { WorkTypeTableComponent } from './components/work-type-table/work-type-table.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { LastStepComponent } from './components/input-forms/last-step/last-step.component';
import {
  OptimizationProcessLoaderModule
} from '../shared-modules/optimization-process-loader/optimization-process-loader.component';
import { FaIconModule } from '../shared-modules/fa-icon/fa-icon.component';


@NgModule({
  declarations: [
    CalculationsComponent,
    InputFormsComponent,
    BasketInfoComponent,
    UserPrivateInfoComponent,
    UserWorkInfoComponent,
    WorkTypeTableComponent,
    LastStepComponent
  ],
    imports: [
        CommonModule,
        CalculationsRoutingModule,
        MatStepperModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        ControlWrapperModule,
        MatTableModule,
        MatRadioModule,
        MatListModule,
        OptimizationProcessLoaderModule,
        FaIconModule,
    ]
})
export class CalculationsModule { }
