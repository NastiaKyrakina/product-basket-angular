import { Component, Input } from '@angular/core';
import { IOptimizationGeneral } from '../../../../models/optimization';

@Component({
  selector: 'app-optimization-result-pie',
  templateUrl: './optimization-result-pie.component.html',
  styleUrls: ['./optimization-result-pie.component.scss']
})
export class OptimizationResultPieComponent {

  view: [number, number] = [700, 300];

  @Input() set data(data: IOptimizationGeneral | null) {
    this.chartData = data ? this.getData(data) : [];
  }

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  legendTitle: string = 'Складові';
  chartData: Array<{name: string; value: number}> = [];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#6654AA']
  };

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  tooltipText(data: any): void {

  }

  getData(general: IOptimizationGeneral): Array<{name: string; value: number}> {
    const data = [];
    const carbohydratesPercent = (general.carbohydrates * 4 * 100) / general.energy;
    const proteinsPercent = (general.proteins * 4 * 100) / general.energy;
    const fatsPercent = (general.fats * 9 * 100) / general.energy;
    const other = 100 - (carbohydratesPercent + proteinsPercent + fatsPercent);

    data.push({
      'name': 'Вуглеводи',
      'value': Math.round(carbohydratesPercent),
    });

    data.push({
      'name': 'Білки',
      'value': Math.round(proteinsPercent),
    });

    data.push({
      'name': 'Жири',
      'value': Math.round(fatsPercent),
    });

    data.push({
      'name': 'Інше',
      'value': Math.round(other),
    });

    // data.push({
    //   'name': 'Інше',
    //   'value': general.fats,
    // });
    return data;
  }
}
