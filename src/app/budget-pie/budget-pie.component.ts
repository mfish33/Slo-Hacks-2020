import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import  palette from 'google-palette/palette'
import {DataStoreService} from '../services/data-store.service'
import { Form } from '../services/formModel'

@Component({
  selector: 'app-budget-pie',
  templateUrl: './budget-pie.component.html',
  styleUrls: ['./budget-pie.component.css']
})
export class BudgetPieComponent implements OnInit {

  chart

  chartData:{label:string[],data:number[]} = {label:[],data:[]}

  constructor(dataStore:DataStoreService) {
    dataStore.doc$.subscribe((data:Form) => {
      this.chart.chart.data.datasets[0].data = [dataStore.currentBudget, data.personalInfo.income - dataStore.currentBudget]
      this.chart.chart.data.labels = ['unbudgeted','budgeted']
      this.chart.chart.data.datasets[0].backgroundColor = palette('tol', 2).map(hex => '#' + hex)
      
      this.chart.update()
    })
   }

  ngOnInit(): void {
    this.chart = new Chart('budget-pie-chart', {
        type: 'doughnut',
        data: {
          labels: this.chartData.label,
          datasets: [{
            label: "money (dollars)",
            backgroundColor: palette('tol', this.chartData.data.length).map(function(hex) {
        return '#' + hex;
      }),
            data: this.chartData.data
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Your Monthly Budget (dollars)'
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                return data.datasets[0].data[tooltipItem.datasetIndex].toLocaleString('en-US', { style: 'currency', currency: 'USD' }) ;
              }
            }
          }
        }
    });
  }

}