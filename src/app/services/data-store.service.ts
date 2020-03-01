import { Injectable } from '@angular/core';
import {AuthServiceService} from './auth-service.service'
import { Observable, from, of, Subject } from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Form } from './formModel'
import { switchMap, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  doc$:Observable<any>
  currentIndex = 0;
  currentPlan:string
  plans:string[]
  currentBudget
  updateTrigger = new Subject<any>();
  private jsonStringifiedDoc

  constructor(private auth:AuthServiceService, private afs:AngularFirestore) { 

    this.doc$ = this.auth.user$.pipe(

      switchMap(user =>{
        return this.afs.collection('users').doc(user.uid).snapshotChanges()
      }),
      switchMap(doc => {
        console.log(doc.payload.data())
        //@ts-ignore
        let docData:{uid:string,plans?:string[]} = doc.payload.data()
        this.currentPlan = docData.uid
        if(!docData.plans) {  
            doc.payload.ref.update({plans:[docData.uid]})
            this.plans = [docData.uid]
        } else {
          this.plans = docData.plans
        }
        return this.afs.collection('plans').doc(this.plans[this.currentIndex]).snapshotChanges() 
      }),

      switchMap(doc => !doc.payload.exists ? from(doc.payload.ref.set(this.createDefaultTemplate())) : of(doc)),
      //@ts-ignore
      map(doc => doc.payload.data()),
      tap((doc:Form) => {
        this.jsonStringifiedDoc = JSON.stringify(doc)
        let incomePostTax = doc.taxes.incomeAfterTaxes ? doc.taxes.incomeAfterTaxes / 12: 0
        let expenses = doc.expenses.reduce((acc,ex) => acc + ex.monthly,0)
        let investments = (doc.investment["401k"] ? doc.investment["401k"] : 0) + (doc.investment.IRAAmount ? doc.investment.IRAAmount : 0) + (doc.investment.stocks ?  doc.investment.stocks : 0)
        this.currentBudget =  incomePostTax - expenses - investments
      })
      )
    }

  updateData(PartialSheetInfo:object) {
    const ref = this.afs.doc(`plans/${this.plans[this.currentIndex]}`)
    ref.update(PartialSheetInfo)
  }

  createDefaultTemplate() {
    return {
      personalInfo:{},
      taxes:{},
      expenses:[{expense:"gas",weekly:0},{expense:"car Payment", weekly:0}],
      lifeChoices:{},
      investment:{}
    } as Form
  }

  async createNewDoc() {
    let newDoc = await this.afs.collection('plans').add(this.createDefaultTemplate())
    this.plans.push(newDoc.id)
    this.afs.collection('users').doc(this.auth.user.uid).update({plans:this.plans})
    this.currentIndex++
  }

  switchDoc(docID:string) {
    this.currentIndex = this.plans.indexOf(docID)
    this.currentPlan = this.plans[this.currentIndex]
    console.log(docID)
    this.updateData({somthing:'test'})
  }

  retreiveExcel() {
    fetch('URLHERE', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: this.jsonStringifiedDoc // body data type must match "Content-Type" header
    })
    .then(res => res.text())
    .then(url => fetch(url))
  }


}
