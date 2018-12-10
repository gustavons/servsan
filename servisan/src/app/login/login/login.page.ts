import { EmailLoginService } from './../services/email-login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { NavController } from 'ionic-angular';
import { NavController, LoadingController } from '@ionic/angular';
import { HomePage } from '../../home/home.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
	loginError: string;

	constructor(
		private navCtrl: NavController,
		private auth: EmailLoginService,
		fb: FormBuilder
	) {
		this.loginForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
	}

  ngOnInit() {
  }

  login() {
		let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signInWithEmail(credentials)
			.then(
        () => this.navCtrl.navigateRoot('\login'),
        error => this.loginError = error.message
			);
  }
  
  

}

