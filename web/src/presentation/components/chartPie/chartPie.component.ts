import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

@Component({
  selector: 'app-chart-pie',
  imports: [NgApexchartsModule],
  template: `
    <apx-chart
      [series]="chartOptions.series!"
      [chart]="chartOptions.chart!"
      [labels]="chartOptions.labels"
      [responsive]="chartOptions.responsive!"
    />
  `,
  styleUrl: './chartPie.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartPieComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
