import { Component, OnInit, ViewChild, Pipe } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";
import { AngularFirestore } from "angularfire2/firestore";
import { Chat, ChatService } from "../services/chats.service";
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})
// @Pipe({
//   name: 'sort',
// })


export class ChatroomPage implements OnInit {
  chats: any = [];
  chatpartner = this.chatService.currentChatPartner;
  chatuser;
  message: string;
  chatPayload: Chat;
  intervalScroll;
  @ViewChild("content") content: any;

  constructor(
    public navCtrl: NavController,
    
    private db: AngularFirestore,
    private chatService: ChatService,
    private storage: Storage
  ) {}

  //scrolls to bottom whenever the page has loaded
  ionViewDidEnter() {
    this.content.scrollToBottom(300); //300ms animation speed
  }

  ngOnInit() {

    this.storage.get("cadastro").then(chatuser => {
      this.chatuser = chatuser;
    });

    this.db
      .collection<Chat>("contato", res => {
        return res.where("pair", "==", this.chatService.currentChatPairId);
      })
      .valueChanges()
      .subscribe(chats => {
        
        this.chats = chats;
       
      });

    
  } //ngOnInit

  addChat() {
    if (this.message && this.message !== "") {
      console.log(this.message);
      this.chatPayload = {
        message: this.message,
        sender: this.chatuser.email,
        pair: this.chatService.currentChatPairId,
        time: new Date().getTime()
      };

      this.chatService
        .addChat(this.chatPayload)
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

  isChatPartner(senderEmail) {
    return senderEmail == this.chatpartner.email;
  } //isChatPartner
}
