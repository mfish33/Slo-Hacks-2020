import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray } from '@angular/forms'
import { DataStoreService } from '../services/data-store.service'
import { Form } from '../services/formModel'
import { debounceTime,tap,take } from 'rxjs/operators'

@Component({
  selector: 'app-investment-info',
  templateUrl: './investment-info.component.html',
  styleUrls: ['./investment-info.component.css']
})
export class InvestmentInfoComponent implements OnInit {

  investmentForm:FormGroup

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
     this.investmentForm.patchValue(doc.investment)
    })



    this.investmentForm.valueChanges.pipe(debounceTime(500))
    .subscribe(update =>{
       this.dataStore.updateData({investment: update});
    })
  }


}
