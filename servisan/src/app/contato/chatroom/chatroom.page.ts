import { Message } from './../services/chats.service';
import { Component, OnInit, ViewChild, Pipe } from "@angular/core";
import { NavController, NavParams, LoadingController } from "@ionic/angular";
import { AngularFirestore } from "angularfire2/firestore";
import { Chat, ChatService } from "../services/chats.service";
import {Storage} from '@ionic/storage';
import * as firebase from "firebase";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})
// @Pipe({
//   name: 'sort',
// })


export class ChatroomPage implements OnInit {
  messageUser: any = [];
  chatpartner = this.chatService.currentChatPartner;
  chatuser;
  message: string;
  chatPayload: Message;
  intervalScroll;
  @ViewChild("content") content: any;
  conversaId: any;
  route: any;

  constructor(
    public navCtrl: NavController,
    private db: AngularFirestore,
    private chatService: ChatService,
    private storage: Storage,
    private loadingController: LoadingController
  ) {}

  //scrolls to bottom whenever the page has loaded
  ionViewDidEnter() {
    this.content.scrollToBottom(300); //300ms animation speed
  }

  ngOnInit() {

    // this.conversaId = this.route.snapshot.params['id'];
    // if (this.conversaId)  {
    //   this.loadMessage();
    // }
    


      this.storage.get("cadastro").then(chatuser => {
        this.chatuser = chatuser;
      });

      this.db
        .collection<Chat>("mensagem", res => {
          return res.where("pair", "==", this.chatService.currentChatPairId);
        })
        .valueChanges()
        .subscribe(messageUser => {
          
          this.messageUser = messageUser;
        
        });

      

    
  } //ngOnInit


  // async loadMessage() {
  //   const loading = await this.loadingController.create({
  //     message: 'Loading Todo..'
  //   });
  //   await loading.present();
 
  //   this.chatService.getChatUserByPairId(this.conversaId).subscribe(res => {
  //     loading.dismiss();
  //     this.messageUser = res;
  //   });
  // }


  addChat() {
    if (this.message && this.message !== "") {
      console.log(this.message);
        this.chatPayload = {
          message: this.message,
          senderId: firebase.auth().currentUser.uid,
          ofertaId: this.chatService.getOfertaId(),
          pair: this.chatService.currentChatPairId,
          time: new Date().getTime()
        };

      this.chatService
        .addMessage(this.chatPayload)
        .then(() => {
          //Clear message box
          this.message = "";

          //Scroll to bottom
          this.content.scrollToBottom(300);
        })
        .catch(err => {
          console.log(err);
        });
    }
  } //addChat

  isChatPartner(id) {
    // console.log("id da cor: "+ id);
    // console.log("Verdade: "+ (id == this.chatpartner))

    return id == this.chatpartner;
  } //isChatPartner
}
