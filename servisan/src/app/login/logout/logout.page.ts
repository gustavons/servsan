import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { LoginPage } from '../login/login.page';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
  

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public fAuth: AngularFireAuth,) { }

  ngOnInit() {
    this.fAuth.auth.signOut();
    this.storage.clear();
    this.navCtrl.navigateForward('login');
  }

}
