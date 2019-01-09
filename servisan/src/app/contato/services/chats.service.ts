import { Chat } from './chats.service';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { Cad } from 'src/app/usuario/services/user.service';
import * as firebase from 'firebase';
import { map, isEmpty } from 'rxjs/operators';

export interface Chat {
  pair: string;
  interessadoId: string;
  prestadorId: string;
  ofertaId: string;
  
  

  time: number;
} 

export interface Message {
  message: string;
  pair: string;
  senderId: string;
  ofertaId: string;

  time: number;
} 

@Injectable({
  providedIn: 'root'
})


@Injectable()
export class ChatService {

  chats: AngularFirestoreCollection<Chat>;
  message: AngularFirestoreCollection<Message>;

  //The pair string for the two users currently chatting
  currentChatPairId;
  currentChatPartner;

  private interestedId:string;
  private workerId:string;
  private ofertId:string;
  messageUser: any;

  private dadosChat : Chat;
  colletionMessageUser: AngularFirestoreCollection<Message>;
  colletionPairUser: AngularFirestoreCollection<Chat>;


  private pairNotExist = false;


  constructor(private db: AngularFirestore) {
    
    this.chats = db.collection<Chat>("contato");
    this.message = db.collection<Message>("mensagem");


  }

  // addUser(payload) {
  //   return this.users.add(payload);
  // } //addUser

  addMessage(message: Message) {
    return this.message.add(message);
  } //addChat
  

  getChatUser(){

    this.colletionMessageUser = this.db.collection<Message>('mensagem', ref => 
      ref.where('iduser', '==', firebase.auth().currentUser.uid));
    this.messageUser = this.colletionMessageUser.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.messageUser;
  }

  getOfertaId(){
    return this.ofertId;
  }
  createChat(user1, ofertaData, idOferta, pairId){

    // console.log(user1);
    // console.log(ofertaData.iduser);
    // console.log(idOferta);
    // console.log(pairId);



    

    // var pair = this.createPairId(user1, ofertaData, idOferta);
    this.colletionPairUser = this.db.collection<Chat>('contato', ref => 
      ref.where('pair', '==', pairId));
    this.colletionPairUser
    var a = this.colletionPairUser.snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    ).subscribe(snapshot => {
      if(snapshot.length == 0) {  
        console.log('Piar id match NOT found')
        this.pairNotExist = true;
        this.veio(true);
      } else {
        console.log('Pair id match found for user' + snapshot[0].id )
        this.pairNotExist = false;
        this.veio(false);


      }
    });
    console.log(this.pairNotExist);


    
    if ( this.pairNotExist){

      console.log("não existe")

      this.dadosChat = {
        pair : pairId,
        interessadoId : user1.uid,
        prestadorId : ofertaData.iduser,
        ofertaId : idOferta,
        time : new Date().getTime()

      }

      this.chats.add(this.dadosChat);
    }
    
  }

  veio(value){
    console.log("veio");
    this.pairNotExist = value;
  }

  createPairId(user1, ofertaData, idOferta) {
    
    let pairId;
    this.interestedId = user1.uid;
    this.workerId = ofertaData.iduser;
    this.ofertId = idOferta;
    
    if (firebase.auth().currentUser.uid == ofertaData.iduser){

      this.currentChatPartner = this.interestedId;

    }else{
      this.currentChatPartner = firebase.auth().currentUser.uid;
    }

    // pair id é formada pelo id do usuário que cadastrou 
    // a oferta e id do usuario que está enviando e id da oferta
    pairId = `${user1.uid}|${ofertaData.iduser}|${idOferta}`;
    
    this.createChat(user1, ofertaData, idOferta, pairId);

    return pairId;
  } //createPairString

}