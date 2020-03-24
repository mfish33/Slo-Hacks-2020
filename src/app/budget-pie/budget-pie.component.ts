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
      
      this.chart.chart.data.datasets[0].data = [dataStore.currentBudget > 0 ? dataStore.currentBudget: 0, data.personalInfo.income / 12 - dataStore.currentBudget]
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
            backgroundColor: palette('tol', this.chartData.data.length).map(hex =>'#' + hex),
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
              label: (tooltipItem, data) => {
                return `${data.labels[tooltipItem.index]}: ${data.datasets[0].data[tooltipItem.index].toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
              }
            }
          }
        }
    });
  }

}