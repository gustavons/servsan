import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AlterarServicoPageModule } from './servico/alterar-servico/alterar-servico.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { IonicStorageModule } from '@ionic/storage';
import { SortPipe } from './pipes/sort.pipe';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  	AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AlterarServicoPageModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
