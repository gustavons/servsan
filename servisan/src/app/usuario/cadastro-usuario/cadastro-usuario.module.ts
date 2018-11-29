import { AppComponent } from './../../app.component';
import { AppRoutingModule } from './../../app-routing.module';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from './../../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { CadastroUsuarioPage } from './cadastro-usuario.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

const routes: Routes = [
  {
    path: '',
    component: CadastroUsuarioPage
  }
];

@NgModule({
  declarations: [CadastroUsuarioPage],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
 providers: [
   StatusBar,
   SplashScreen,
   { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
 ],
  bootstrap: [AppComponent]
})
export class CadastroUsuarioPageModule {}
