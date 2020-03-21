import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import {DataStoreService} from '../services/data-store.service'
import { Form } from '../services/formModel'

@Component({
  selector: 'app-investment-chart',
  templateUrl: './investment-chart.component.html',
  styleUrls: ['./investment-chart.component.css']
})
export class InvestmentChartComponent implements OnInit {

  constructor(private dataStore:DataStoreService) { 
    dataStore.doc$.subscribe((data:Form) => {
      let investmetCalc = [{'401k':data.investment["401k"] * data.investment["401kContrib"] / 100, IRA:data.investment.IRAAmount, stocks:data.investment.stocks}]
      let age = data.personalInfo.age
      let dataPoints = [age]
      for(let i = 1; age + i < 65; i++) {
        dataPoints.push(age + i)
        investmetCalc[i] = {
          '401k': data.investment["401k"] * data.investment["401kContrib"] / 100 + investmetCalc[i-1]["401k"]*1.06, 
          IRA:data.investment.IRAAmount + investmetCalc[i-1].IRA*1.08, 
          stocks:data.investment.stocks + investmetCalc[i-1].stocks*1.1
        }
      }
      let retirementExpense = data.personalInfo.income / 2;

      for(let j = 65 - age; j < 86 - age; j++) {
        dataPoints.push(age + j)

        let totalSaved = Object.keys(investmetCalc[j-1]).reduce((acc,key) => acc + investmetCalc[j-1][key],0)

        investmetCalc[j] = {
          '401k': investmetCalc[j-1]["401k"]*1.06 - retirementExpense * investmetCalc[j-1]['401k'] / totalSaved, 
          IRA: investmetCalc[j-1].IRA*1.08 - retirementExpense * investmetCalc[j-1].IRA / totalSaved, 
          stocks: investmetCalc[j-1].stocks*1.02 - retirementExpense * investmetCalc[j-1].stocks / totalSaved
        }
      }
      this.chart.chart.data.datasets[0].data = investmetCalc.map(val => Object.keys(val).reduce((acc,key) => acc + val[key],0))
      this.chart.chart.data.labels = dataPoints.map(val => `Age: ${val}`)
      
      this.chart.update()
    })
  }

  chart

  ngOnInit(): void {
    this.chart = new Chart("line-chart", {
      type: 'line',
      data: {
        datasets: [{ 
            borderColor: "#3e95cd",
            fill: false,
            label:'Invested Capital'
          }]
      },
      options: {
        title: {
          display: true,
          text: 'Investment growth through retirement (USD)'
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
              return `${datasetLabel} ` + tooltipItem.yLabel.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) ;
            }
          }
        }
      }
    });
  }

}
