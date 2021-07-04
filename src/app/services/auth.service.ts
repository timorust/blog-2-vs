import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import { Observable } from 'rxjs/Observable';
import {switchMap} from "rxjs/operators";
import firebase from "firebase";
import { of } from 'rxjs';
import { UserInterface } from '../user.interface';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

 user: Observable<UserInterface | null > | null;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {

                this.user = this.afAuth.authState.pipe(
                  switchMap(auth => {
                    if(auth) {
                      return this.afs.doc(`users/${auth.uid}`).valueChanges();
                    }
                    else {
                      return of(null);
                    }
                  })
                )
  }

  createUserDoc(auth) {
    return this.afs.doc(`users/${auth.uid}`).set({
      displayName: auth.displayName,
      email: auth.email,
      photoURL: auth.photoURL,
      uid: auth.uid,
      voted: []
    })
  }

  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }

  logOut() {
    return this.afAuth.signOut();
  }
}
