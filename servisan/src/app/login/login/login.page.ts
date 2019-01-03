import { EmailLoginService, User } from './../services/email-login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { NavController } from 'ionic-angular';
import { NavController, LoadingController, NavParams, ToastController } from '@ionic/angular';
import { HomePage } from '../../home/home.page';
import { ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs";
import { Storage } from "@ionic/storage";
import { ChatService } from 'src/app/contato/services/chats.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})



export class LoginPage implements OnInit {

	// public user: User =  {
  //   email: '',
  //   password: ''
  // }

  public userAuth;

  //email: string;
  loginForm: any = {};
  

  constructor(
    private db: AngularFirestore,
    private route: ActivatedRoute, 
    private nav: NavController,  
    private loadingController: LoadingController, 
    private EmailLoginService: EmailLoginService,
    public navCtrl: NavController,
    public fAuth: AngularFireAuth,
    private chatservice: ChatService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private storage: Storage){
  }

  // ngOnInit() {
  // }

  ngOnInit() {
    this.storage.get("cadastro").then(chatuser => {
      if (chatuser && chatuser.email !== "") {
        this.navCtrl.navigateForward("home");
      }
    });
  }
  

  

  async loginUser() {

    if (this.loginForm.email != "") {

      try {
        var r = await this.fAuth.auth.signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        );

        this.userAuth = r;

        this.db
        .collection<User>("cadastro", ref => {
          return ref.where("email", "==", this.loginForm.email);
        })
        .valueChanges()
        .subscribe(users => {

          
          //User already exists, move to chats page
          
          this.storage.set("cadastro", users[0]);

          let toast = this.toastCtrl.create({
            message: "Login In Successful",
            duration: 3000,
            position: "top"
          });
          
        });

        if (r) {
          console.log("Successfully logged in!");
          this.navCtrl.navigateForward('home');
        }
  
      } catch (err) {
        console.error(err);
      }
      
    }
      
  }



  // async login() {
    
  //   try {
  //     var r = await this.fAuth.auth.signInWithEmailAndPassword(
  //       this.user.email,
  //       this.user.password
  //     );
  //     if (r) {
  //       console.log("Successfully logged in!");
  //       this.navCtrl.navigateForward('home');
  //     }

  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

    
  
}

