import { Injectable } from '@angular/core';
import {AuthServiceService} from './auth-service.service'
import { from, of, Subject  } from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Form } from './formModel'
import { switchMap, map, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  doc$ = new Subject<Form>();
  update$ = new Subject();
  currentIndex = 0;
  currentPlan:string
  plans:string[]
  currentBudget
  currentSub
  private jsonStringifiedDoc

  constructor(private auth:AuthServiceService, private afs:AngularFirestore) { 
    this.subToDoc()  
    }

  updateData(PartialSheetInfo:object) {
    const ref = this.afs.doc(`plans/${this.plans[this.currentIndex]}`)
    ref.update(PartialSheetInfo)
  }

  createDefaultTemplate() {
    return {
      personalInfo:{},
      taxes:{},
      expenses:[{expense:"gas",weekly:40},{expense:"car Payment", weekly:200}],
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
    this.subToDoc()
  }

  subToDoc() {
    this.currentSub =  this.auth.user$.pipe(

      switchMap(user =>{
        return this.afs.collection('users').doc(user.uid).snapshotChanges()
      }),
      switchMap(doc => {
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
      ).subscribe(doc => this.doc$.next(doc))
  }


}
