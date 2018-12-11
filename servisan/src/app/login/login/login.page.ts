import { EmailLoginService, User } from './../services/email-login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { NavController } from 'ionic-angular';
import { NavController, LoadingController, NavParams } from '@ionic/angular';
import { HomePage } from '../../home/home.page';
import { ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})



export class LoginPage implements OnInit {

	public user: User =  {
    email: '',
    password: ''
  }

  constructor(private route: ActivatedRoute, private nav: NavController,  private loadingController: LoadingController, private EmailLoginService: EmailLoginService ,public navCtrl: NavController,public fAuth: AngularFireAuth){
  }

  ngOnInit() {
  }


  async login() {
    
    try {
      var r = await this.fAuth.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        console.log("Successfully logged in!");
        this.navCtrl.navigateForward('home');
      }

    } catch (err) {
      console.error(err);
    }
  }

    
  
}

