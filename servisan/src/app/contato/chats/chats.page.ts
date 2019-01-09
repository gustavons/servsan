// import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from "@ionic/angular";
import { AngularFirestore } from "angularfire2/firestore";
import {Storage} from '@ionic/storage';


import { ChatService } from '../services/chats.service';
import { CadService } from 'src/app/usuario/services/user.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})

export class ChatsPage implements OnInit {
  availableusers: any = [];
  chatuser;
  constructor(
    public navCtrl: NavController,
    
    private dbUser: AngularFirestore,
    private db: CadService,
    private storage: Storage,
    private chatService: ChatService,
    private at: AngularFireAuth
  ) {}

  ngOnInit() {
    //Fetch other users

    this.storage.get("cadastro").then(chatuser => {
      this.chatuser = chatuser;

      this.db = new CadService(this.at, this.dbUser);
      this.db.getCads().subscribe(res => {
        this.availableusers = res;
        this.availableusers = res.filter(user => {
          if (user.email != chatuser.email) {
            return user;
          }
        });
      });
        // .collection<User>(appconfig.users_endpoint)
        // .valueChanges()
        // .subscribe(users => {
        //   //this.availableusers = users;
        //   console.log(users);
        //   this.availableusers = users.filter(user => {
        //     if (user.email != chatuser.email) {
        //       return user;
        //     }
        //   });
        // });
    });
  }

  // goToChat(chatpartner) {
  //   this.chatService.currentChatPairId = this.chatService.createPairId(
  //     this.chatuser,
  //     chatpartner
  //   );

  //   this.chatService.currentChatPartner = chatpartner;

  //   this.navCtrl.navigateForward('chatroom');

  // } //goToChat
}
