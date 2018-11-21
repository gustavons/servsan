import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {AngularFireModule, FirebaseAppConfig} from '@angular/fire'

const FirebaseAppConfig: FirebaseAppConfig = {
    apiKey: "AIzaSyDYlL3HtkQ2K88aoxqJQy42PjsKrDfYHvA",
    authDomain: "servsan-c238a.firebaseapp.com",
    databaseURL: "https://servsan-c238a.firebaseio.com",
    projectId: "servsan-c238a",
    storageBucket: "servsan-c238a.appspot.com",
    messagingSenderId: "236703174542"
  };

@NgModule({
  declarations: [ 
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseAppConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
 