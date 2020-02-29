import { Injectable } from '@angular/core';
import { auth } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth'
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user:firebase.User
  user$:Observable<any>
  constructor(private afAuth:AngularFireAuth, private afs:AngularFirestore, private router:Router) { 
    this.user$ = this.afAuth.authState
    this.afAuth.authState.subscribe(user => this.user = user)

  }

  signOut() {
    this.afAuth.auth.signOut()
  }

}
