import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray } from '@angular/forms'
import { DataStoreService } from '../services/data-store.service'
import {debounceTime, take, tap} from 'rxjs/operators'
import { Form } from '../services/formModel'
import { format } from 'url';

@Component({
  selector: 'app-living-expenses',
  templateUrl: './living-expenses.component.html',
  styleUrls: ['./living-expenses.component.css']
})

export class LivingExpensesComponent implements OnInit {

  expenses:FormArray
  private FORM_UPDATE_TAG = 'expenses'

  constructor(private fb: FormBuilder, private dataStore:DataStoreService ) { }

  async ngOnInit() {
    this.expenses = this.fb.array([])
    this.dataStore.doc$.pipe().subscribe((doc:Form) => {
      let update = doc.expenses.map(ex => this.fb.group({
      expense:ex.expense,
      weekly:ex.weekly,
      monthly:ex.weekly * 4,
      yearly:ex.weekly * 4 * 12
    }))
    if(this.expenses.length != doc.expenses.length || doc.id != this.dataStore.doc.id) {
      this.expenses.clear()
      for(let expense of doc.expenses) {
        this.addExpense(expense.expense,expense.weekly)
      }
    }
    })

    this.expenses.valueChanges.pipe(
      tap((change) => {
      change.forEach(element => {
        let changeAsWeekly = this.getChangedVal(element)
        if(changeAsWeekly) {
          element['weekly'] = changeAsWeekly
          element['monthly'] = changeAsWeekly * 4
          element['yearly'] = changeAsWeekly * 12 * 4
          this.expenses.patchValue(change)
        } 
      }); 
    }),
    debounceTime(500)
    ).subscribe(update => {
      this.dataStore.updateData({[this.FORM_UPDATE_TAG]:update});
    })


  }


  getChangedVal(form) {
    if(form['weekly'] == form['monthly'] / 4 && form['monthly'] == form['yearly'] / 12) {
      return null;
    }
    if(form['weekly'] == form['monthly'] / 4) {
      return form['yearly'] / 12 / 4
    }
    if(form['monthly'] == form['yearly'] / 12){
      return form['weekly']
    }
    return form['monthly'] / 4
  }

  addExpense(expenseName = '' , weekly = 0) {
    const expense = this.fb.group({
      expense:expenseName,
      weekly:weekly,
      monthly:weekly * 4,
      yearly:weekly * 4 * 12
    })
    this.expenses.push(expense)
  }

  deleteExpense(i) {
    this.expenses.removeAt(i)
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }


}
