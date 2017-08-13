import {Injectable} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';

const identifier = 'tokenAuth';

@Injectable()
export class Authentication {

  public token: string;

  constructor(private angularAuth: AngularFireAuth) {
    this.setUp();
  }

  setUp() {
    this.token = this.getTokenLS();
    this.angularAuth.authState.subscribe((firebaseUser) => {
      if (firebaseUser) {
        localStorage.setItem(identifier, firebaseUser.uid);
        this.token = firebaseUser.uid;
      } else {
        localStorage.removeItem(identifier);
        this.token = '';
      }
      //console.log(firebaseUser);
    })
  }

  logOut(){
    this.angularAuth.auth.signOut().then(()=>{
      this.token = null;
    })
  }

  getTokenLS(): string {
    return localStorage.getItem(identifier);
  }

  createUserWithEmailAndPassword(email, password) {
    return this.angularAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  createUserWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return this.createAccountWithProvider(provider);
  }

  createAccountWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();
    return this.createAccountWithProvider(provider);
  }

  createAccountWithProvider(provider) {
    return this.angularAuth.auth.signInWithRedirect(provider).then(result => {
      return firebase.auth().getRedirectResult();
    })
  }
}
