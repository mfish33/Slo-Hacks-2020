import { Injectable } from '@angular/core';
import {AuthServiceService} from './auth-service.service'
import { from, of, Subject, Observable  } from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Form } from './formModel'
import { switchMap, map, tap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'
import { generate } from 'shortid';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  doc$ = new Subject<Form>();
  update$ = new Subject();
  currentIndex = 0;
  currentPlanId:string
  plans:any
  currentBudget
  currentSub
  doc:Form

  constructor(private auth:AuthServiceService, private afs:AngularFirestore,private http:HttpClient) { 
    this.subToDoc()  
    }

  updateData(PartialSheetInfo:object) {
    if(this.currentPlanId) {
      const ref = this.afs.doc(`plans/${this.auth.user.uid}`)
      ref.set({[this.doc.id]:PartialSheetInfo},{merge:true})
    }
  }

  createDefaultTemplate(id:string,name:string = null) {
    return {
      [id]:{
        id:id,
        personalInfo:{
          sheetName:name,
          income:null,
          age:25,
          state:null,
        },
        taxes:{},
        expenses:[{expense:"gas",weekly:40},{expense:"car Payment", weekly:200}],
        lifeChoices:{},
        investment:{
          '401k':null,
          '401kContrib':100,
          IRAType:null,
          IRAAmount:null,
          stocks:null
        }
      }as Form
    }
       
  }

  async createNewDoc() {
    let id = generate()
    await this.afs.collection('plans').doc(this.auth.user.uid).set(this.createDefaultTemplate(id,`Plan: ${Object.keys(this.plans).length + 1}`),{merge:true})
    this.switchDoc(id)
  }

  switchDoc(docID:string) {
    this.currentPlanId = docID
    this.subToDoc()
  }

  subToDoc() {
    this.currentSub =  this.auth.user$.pipe(
      switchMap(user => this.afs.collection('plans').doc(user.uid).snapshotChanges()),
      switchMap(doc => !doc.payload.exists ?  from(doc.payload.ref.set(this.createDefaultTemplate(generate()))): of(doc)),
      //@ts-ignore
      map(doc =>  doc.payload.data()),
      tap(plans => this.plans = plans),
      map(plans => {
        if(this.currentPlanId) {
          return plans[this.currentPlanId] as Form
        }
        this.currentPlanId = Object.keys(plans)[0]
        return plans[this.currentPlanId] as Form
      }),
      tap((doc:Form) => {
        this.doc = doc
        let incomePostTax = doc.taxes.incomeAfterTaxes ? doc.taxes.incomeAfterTaxes / 12: 0
        let expenses = doc.expenses.reduce((acc,ex) => acc + ex.monthly,0)
        let investments = (doc.investment["401k"] ? doc.investment["401k"] : 0) + (doc.investment.IRAAmount ? doc.investment.IRAAmount : 0) + (doc.investment.stocks ?  doc.investment.stocks : 0)
        this.currentBudget =  incomePostTax - expenses - investments
      })
      ).subscribe(doc => this.doc$.next(doc))
  }

  downloadExcel() {
    return this.http.post('https://us-central1-slo-hacks-python-gcf.cloudfunctions.net/GenExcel',JSON.stringify(this.doc),
    {
      headers:{
       'content-type':'application/json'
      },
      responseType:'blob'
    })
  }

  deletePlan() {
    let planIds = Object.keys(this.plans)
    if(planIds.length > 1) {
      this.afs.collection('plans').doc(this.auth.user.uid).update({
        [this.doc.id]:firebase.firestore.FieldValue.delete()
      })

      this.switchDoc(planIds.filter(id => id !== this.currentPlanId)[0])
    }
    
  }

}


