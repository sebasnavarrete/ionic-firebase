import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Authentication} from "../../services/authentication";
import {HomePage} from "../home/home";

/**
 * Generated class for the SignUpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  email: string;
  password: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private auth: Authentication,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SignUpPage');
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
  }

  createAccount(){
    this.presentLoadingDefault();
    this.auth.createUserWithEmailAndPassword(this.email,this.password);
  }

  createAccountWithGoogle(): void{
    this.presentLoadingDefault();
    this.auth.createUserWithGoogle();
  }

  createAccountWithFacebook(): void{
    this.presentLoadingDefault();
    this.auth.createAccountWithFacebook();
  }


}
