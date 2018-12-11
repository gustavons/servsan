import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

export interface User {
	email: string;
	password: string;
}

@Injectable({
  providedIn: 'root',
})


export class EmailLoginService {

  private user: firebase.User;

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
  }
  
}