import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import  palette from 'google-palette/palette'
import {DataStoreService} from '../services/data-store.service'
import { Form } from '../services/formModel'

@Component({
  selector: 'app-expense-pie-chart',
  templateUrl: './expense-pie-chart.component.html',
  styleUrls: ['./expense-pie-chart.component.css']
})
export class ExpensePieChartComponent implements OnInit {

  chart

  chartData:{label:string[],data:number[]} = {label:[],data:[]}

  constructor(dataStore:DataStoreService) {
    dataStore.doc$.subscribe((data:Form) => {
      let labels = [], dataVals =[]; 
      for(let expense of data.expenses) {
        labels.push(expense.expense)
        dataVals.push(expense.monthly)
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
            text: 'Your Monthly expenses (dollars)'
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                return `${data.labels[tooltipItem.index]}: ${data.datasets[0].data[tooltipItem.index].toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
              }
            }
          }
        }
    });
  }

}
