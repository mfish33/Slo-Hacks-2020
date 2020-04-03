import { Component, OnInit } from '@angular/core';
import {DataStoreService} from '../services/data-store.service'


@Component({
  selector: 'app-expense-widget',
  templateUrl: './expense-widget.component.html',
  styleUrls: ['./expense-widget.component.css']
})
export class ExpenseWidgetComponent implements OnInit {

  spanCss = `
  color:${this.dataStore.currentBudget > 0 ? 'green' : 'red'};
  `

  constructor(public dataStore:DataStoreService) { 
  }

  ngOnInit(): void {
  }


}
