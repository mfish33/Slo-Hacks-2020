import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataStoreService } from '../services/data-store.service'
import { Form } from '../services/formModel'
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-graph-side',
  templateUrl: './graph-side.component.html',
  styleUrls: ['./graph-side.component.css']
})
export class GraphSideComponent{

  constructor(public dataStore:DataStoreService) { }

  get planIds() {
    return this.dataStore.plans ? Object.keys(this.dataStore.plans) : []
  }

  getPlanName(id:string):string {
    let plan = this.dataStore.plans[id] as Form
    return plan?.personalInfo?.sheetName
  }

  switchPlan(planId) {
    this.dataStore.switchDoc(planId)
  }

}
