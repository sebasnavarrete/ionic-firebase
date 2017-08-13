import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import * as firebase from 'firebase/app';

import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {SignUpPage} from "../pages/sign-up/sign-up";

import {Authentication} from "../services/authentication";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SignUpPage;

  pages: Array<{ title: string, component: any }>;
  invitedPages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public auth: Authentication) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Inicio', component: HomePage},
    ];
    this.invitedPages = [
      {title: 'Crear cuenta', component: SignUpPage}
    ];

  }

  logOut() {
    this.auth.logOut();
    this.rootPage = SignUpPage;
    this.nav.popToRoot();
  }

  initializeApp() {
    firebase.auth().getRedirectResult().then(result => {
      this.rootPage = HomePage;
      this.nav.popToRoot();
    });
    if (this.auth.token) {
      this.rootPage = HomePage;
    } else {
      this.rootPage = SignUpPage;
    }
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
