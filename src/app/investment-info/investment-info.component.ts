import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray } from '@angular/forms'
import { DataStoreService } from '../services/data-store.service'
import { Form } from '../services/formModel'

@Component({
  selector: 'app-investment-info',
  templateUrl: './investment-info.component.html',
  styleUrls: ['./investment-info.component.css']
})
export class InvestmentInfoComponent implements OnInit {

  investmentForm
  moneyLeft

  constructor(private fb:FormBuilder, private dataStore:DataStoreService) { }

  ngOnInit(): void {
    this.investmentForm = this.fb.group({
      '401k':0,
      '401kContrib':100,
      IRAType:'',
      IRAAmount:0,
      stocks:0
    })
    this.dataStore.doc$.subscribe((doc:Form) => {
      let expenseTotal = doc.expenses.reduce((acc,ex) => acc+ex.monthly,0)
      this.moneyLeft = doc.personalInfo.income - expenseTotal
    })
  }

}
