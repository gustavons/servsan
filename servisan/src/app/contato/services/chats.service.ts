import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { Cad } from 'src/app/usuario/services/user.service';

export interface Chat {
  message: string;
  pair: string;
  sender: string;
  time: number;
} 

@Injectable({
  providedIn: 'root'
})


@Injectable()
export class ChatService {
  users: AngularFirestoreCollection<Cad>;

  chats: AngularFirestoreCollection<Chat>;

  //The pair string for the two users currently chatting
  currentChatPairId;
  currentChatPartner;

  constructor(private db: AngularFirestore) {
    
    this.users = db.collection<Cad>("cadastro");
    this.chats = db.collection<Chat>("contato");
  }

  addUser(payload) {
    return this.users.add(payload);
  } //addUser

  addChat(chat: Chat) {
    return this.chats.add(chat);
  } //addChat

  createPairId(user1, user2) {
    let pairId;
    if (user1.createdAt < user2.createdAt) {
      pairId = `${user1.email}|${user2.email}`;
    } else {
      pairId = `${user2.email}|${user1.email}`;
    }

    return pairId;
  } //createPairString

}