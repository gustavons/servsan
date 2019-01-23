import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { ToastController } from '@ionic/angular';
import { FcmService } from './notificacao/service/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Mensagens',
      url: '/minhas_mensagens',
      icon: 'send'
    },
    {
      title: 'Buscar Serviço',
      url: '/buscar-servico',
      icon: 'search'
    },
    {
      title: 'Cadastrar Serviço',
      url: '/servico',
      icon: 'add'
    },
    {
      title: 'Cadastrar Demanda ',
      url: '/cadastrar-demanda',
      icon: 'add-circle'
    },
    {
      title: 'Buscar Demandas',
      url: '/visualizar-demanda',
      icon: 'bulb'
    },
    {
      title: 'Minhas demandas',
      url: '/minhas_demandas',
      icon: 'megaphone'
    },
    {
      title: 'Meus Serviços',
      url: '/meus_servicos',
      icon: 'build'
    },
    {
      title: 'Meus Contratos',
      url: '/',
      icon: 'filing'
    },
    {
      title: 'Sobre',
      url: '/sobre_dev',
      icon: 'people'
    },
    {
      title: 'Sair',
      url: 'logout',
      icon: 'exit'
    },
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    // private toastr: ToastService,
    public toastController: ToastController
  ) {
    this.initializeApp();
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  private notificationSetup() {
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe(
      (msg) => {
        if (this.platform.is('ios')) {
          this.presentToast(msg.aps.alert);
        } else {
          this.presentToast(msg.body);
        }
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup();
    });
  }

}
