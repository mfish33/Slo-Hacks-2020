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

  investmentForm:FormGroup
  moneyLeftPre

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
      this.moneyLeftPre = Math.round(doc.personalInfo.income / 12 - expenseTotal)
    })
  }

  get moneyLeft() {
    let IRA = this.investmentForm.get('IRAAmount').value
    let foutr01 = this.investmentForm.get('401k').value
    let stocks = this.investmentForm.get('stocks').value 
    console.log(IRA)
    //@ts-ignore
    return this.moneyLeftPre - IRA - foutr01 - stocks
  }


}
