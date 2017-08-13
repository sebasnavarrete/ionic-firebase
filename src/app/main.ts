import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

import * as firebase from 'firebase/app';

import {enviroment} from "./env";

firebase.initializeApp(enviroment.firebaseConfig);


platformBrowserDynamic().bootstrapModule(AppModule);

