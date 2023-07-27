import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit{
  
  
  ngOnInit(): void {
    this.doughnutChartData.labels = this.labels; 
    this.doughnutChartData.datasets[0].data = this.data; 
  }

  @Input() 
  public title: string = 'No title';

  @Input() 
  public labels: string[] = ['label 1', 'label 2', 'label 3' ];

  @Input()
  public data: number[] = [350, 450, 100];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.labels,
    datasets: [
      {
        data: this.data,
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      },
    ],
  };
}
