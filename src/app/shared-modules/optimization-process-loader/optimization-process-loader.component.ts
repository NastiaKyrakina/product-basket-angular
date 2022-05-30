import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-optimization-process-loader',
  templateUrl: './optimization-process-loader.component.html',
  styleUrls: ['./optimization-process-loader.component.scss']
})
export class OptimizationProcessLoaderComponent {

}

@NgModule({
  declarations: [
    OptimizationProcessLoaderComponent
  ],
  exports: [
    OptimizationProcessLoaderComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class OptimizationProcessLoaderModule {
}
