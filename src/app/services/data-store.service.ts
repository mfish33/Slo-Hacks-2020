import { Injectable } from '@angular/core';
import {AuthServiceService} from './auth-service.service'
import { Observable, from, of } from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Form } from './formModel'
import { switchMap, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  doc$:Observable<any>
  currentIndex = 0;
  currentBudget

  constructor(private auth:AuthServiceService, private afs:AngularFirestore) { 

    this.doc$ = this.auth.user$.pipe(
      switchMap(user => this.afs.collection('plans').doc(user.uid).snapshotChanges()),
      switchMap(doc => !doc.payload.exists ? from(doc.payload.ref.set(this.createDefaultTemplate())) : of(doc)),
      //@ts-ignore
      map(doc => doc.payload.data()),
      tap((doc:Form) => {
        console.log(JSON.stringify(doc))
        let incomePostTax = doc.taxes.incomeAfterTaxes ? doc.taxes.incomeAfterTaxes / 12: 0
        let expenses = doc.expenses.reduce((acc,ex) => acc + ex.monthly,0)
        let investments = (doc.investment["401k"] ? doc.investment["401k"] : 0) + (doc.investment.IRAAmount ? doc.investment.IRAAmount : 0) + (doc.investment.stocks ?  doc.investment.stocks : 0)
        this.currentBudget =  incomePostTax - expenses - investments
      })
      )
    }

  updateData(PartialSheetInfo:object) {
    const ref = this.afs.doc(`plans/${this.auth.user.uid}`)
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


}
