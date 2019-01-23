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
  id?: string;
  pair: string;
  interessadoId: string;
  prestadorId: string;
  tipoOferta: String;
  ofertaId: string;
  
  

  time: number;
} 

export interface Message {
  id?: string;
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
  createChat(user1, ofertaData, idOferta, pairId, tipoOfert){

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
        
        // Se a conversa não existir o será criada uma pairnova

        this.dadosChat = {
          pair : pairId,
          interessadoId : user1.uid,
          prestadorId : ofertaData.iduser,
          ofertaId : idOferta,
          tipoOferta: tipoOfert,
          time : new Date().getTime()
  
        }
        // Adcicionar no banco de dados 
        this.chats.add(this.dadosChat);
      } else {
        console.log('Pair id match found for user' + snapshot[0].id )
        


      }
    });

    
  }



  createPairId(user1, ofertaData, idOferta, tipoOferta) {
    if(user1.uid == undefined){
      let pairId;
      this.interestedId = user1.iduser;
      this.workerId = ofertaData.iduser;
      this.ofertId = idOferta;
      

      console.log("interessado user uid:"+user1.iduser);
      console.log("ofertaData:"+ofertaData.iduser);      
      console.log("ofertId:"+idOferta);
      if (firebase.auth().currentUser.uid == this.interestedId){

        this.currentChatPartner = this.workerId;

      }else{
        this.currentChatPartner = this.interestedId;
      }

      // pair id é formada pelo id do usuário que cadastrou 
      // a oferta e id do usuario que está enviando e id da oferta
      pairId = `${user1.iduser}|${ofertaData.iduser}|${idOferta}`;
      
      this.createChat(user1, ofertaData, idOferta, pairId, tipoOferta);

      return pairId;
    }









    else{
      let pairId;
      this.interestedId = user1.uid;
      this.workerId = ofertaData.iduser;
      this.ofertId = idOferta;
      console.log("interessado user uid:"+user1.iduser);
      console.log("ofertaData:"+ofertaData.iduser);      
      console.log("ofertId:"+idOferta)
      if (firebase.auth().currentUser.uid == ofertaData.iduser){

        this.currentChatPartner = this.interestedId;

      }else{
        this.currentChatPartner = firebase.auth().currentUser.uid;
      }

      // pair id é formada pelo id do usuário que cadastrou 
      // a oferta e id do usuario que está enviando e id da oferta
      pairId = `${user1.uid}|${ofertaData.iduser}|${idOferta}`;
      
      this.createChat(user1, ofertaData, idOferta, pairId, tipoOferta);

      return pairId;

    }
  } //createPairString

}