import { Injectable } from '@angular/core';
import {AuthServiceService} from './auth-service.service'
import { Observable, from, of } from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Form } from './formModel'
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  doc$:Observable<any>
  currentIndex = 0;

  constructor(private auth:AuthServiceService, private afs:AngularFirestore) { 

    this.doc$ = this.auth.user$.pipe(
      switchMap(user => this.afs.collection('plans').doc(user.uid).snapshotChanges()),
      switchMap(doc => !doc.payload.exists ? from(doc.payload.ref.set(this.createDefaultTemplate())) : of(doc)),
      //@ts-ignore
      map(doc => doc.payload.data())
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
      expenses:[{name:"gas",weekly:0},{name:"car Payment", weekly:0}],
      lifeChoices:{},
      investment:{}
    } as Form
  }


}
