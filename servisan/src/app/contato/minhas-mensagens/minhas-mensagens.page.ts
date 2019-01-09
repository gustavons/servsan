import { TodoService } from './../../servico/services/todo.service';
import { Chat, ChatService } from './../services/chats.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Todo } from 'src/app/servico/services/todo.service';
import { Dem } from 'src/app/demanda/services/demservice.service';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-minhas-mensagens',
  templateUrl: './minhas-mensagens.page.html',
  styleUrls: ['./minhas-mensagens.page.scss'],
})
export class MinhasMensagensPage implements OnInit {

  chatUserInteressado: Chat[];
  chatUserContatado: Chat[];
  
  

  colletionMessageUser: AngularFirestoreCollection<Chat>;
  todoId: any;
  route: any;
  
  

  constructor(
    private chatService: ChatService, 
    private todoService: TodoService,
    private db: AngularFirestore, 
    private navCtrl: NavController,
    private af: AngularFireDatabase) {     
  }
    
    
  ngOnInit() {  
    
    
    this.db
    .collection<Chat>("contato", res => {
      return res.where("interessadoId", "==", firebase.auth().currentUser.uid);
    })
    .valueChanges()
    .subscribe(chatUser => {
      
      this.chatUserInteressado = chatUser;
      
    });

    this.db
    .collection<Chat>("contato", res => {
      return res.where("prestadorId", "==", firebase.auth().currentUser.uid);
    })
    .valueChanges()
    .subscribe(chatUser => {
      
      this.chatUserContatado = chatUser;
      
    });

    
    


  }
// item.interessadoId, item.prestadorId, item.ofertaId
  goToChat(interessadoId, prestadorId, ofertaId) {
    
    this.chatService.currentChatPairId = this.chatService.createPairId(
      interessadoId,
      prestadorId, ofertaId
    );
    
    

    this.navCtrl.navigateForward('chatroom');

  } //goToChat

  // atualizar(){
  //   this.chatService.getChatUser().subscribe(res => {
  //     this.chatUser = res;
  //   });
  // }
  

  

}
