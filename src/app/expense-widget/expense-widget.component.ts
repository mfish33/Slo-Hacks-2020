import { Component, OnInit } from '@angular/core';
import {DataStoreService} from '../services/data-store.service'
import {Form} from '../services/formModel'


@Component({
  selector: 'app-expense-widget',
  templateUrl: './expense-widget.component.html',
  styleUrls: ['./expense-widget.component.css']
})
export class ExpenseWidgetComponent implements OnInit {

  moneyLeft
  constructor(private dataStore:DataStoreService) { 
    this.dataStore.doc$.subscribe((doc:Form) => {
      let income = doc.personalInfo.income ? doc.personalInfo.income / 12 : 0
      let taxes = doc.taxes.totalIncomeTax ? doc.taxes.totalIncomeTax / 12: 0
      console.log(doc.taxes)
      let expenses = doc.expenses.reduce((acc,ex) => acc + ex.monthly,0)
      let investments = doc.investment["401k"] ? doc.investment["401k"] : 0 + doc.investment.IRAAmount ? doc.investment.IRAAmount : 0 + doc.investment.stocks ?  doc.investment.stocks : 0
      this.moneyLeft = income - taxes - expenses - investments
    })
  }

  ngOnInit(): void {
  }

}
