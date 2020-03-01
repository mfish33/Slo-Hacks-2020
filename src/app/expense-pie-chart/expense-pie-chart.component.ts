import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import  palette from 'google-palette/palette'
import {DataStoreService} from '../services/data-store.service'

@Component({
  selector: 'app-expense-pie-chart',
  templateUrl: './expense-pie-chart.component.html',
  styleUrls: ['./expense-pie-chart.component.css']
})
export class ExpensePieChartComponent implements OnInit {

  chart

  chartData:{label:string[],data:number[]} = {label:[],data:[]}

  constructor(dataStore:DataStoreService) {
    dataStore.doc$.subscribe(data => {
      console.log(data)
      let labels = [], dataVals =[]; 
      for(let expense of data.expenses) {
        labels.push(expense.expense)
        dataVals.push(expense.weekly)
      }
      this.chart.chart.data.datasets[0].data = dataVals
      this.chart.chart.data.labels = labels
      this.chart.chart.data.datasets[0].backgroundColor = palette('tol', dataVals.length).map(hex => '#' + hex)
      
      this.chart.update()
    })
   }

  ngOnInit(): void {
    this.chart = new Chart('pie-chart', {
        type: 'doughnut',
        data: {
          labels: this.chartData.label,
          datasets: [{
            label: "Population (millions)",
            backgroundColor: palette('tol', this.chartData.data.length).map(function(hex) {
        return '#' + hex;
      }),
            data: this.chartData.data
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
          }
        }
    });
  }

}
