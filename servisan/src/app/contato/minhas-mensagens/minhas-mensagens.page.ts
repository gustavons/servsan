import { AvaserviceService } from './../../avaliacao/services/avaservice.service';
import { Cad } from './../../usuario/services/user.service';
import { CadService } from 'src/app/usuario/services/user.service';
import { TodoService } from './../../servico/services/todo.service';
import { Chat, ChatService } from './../services/chats.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Todo } from 'src/app/servico/services/todo.service';
import { Dem } from 'src/app/demanda/services/demservice.service';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-minhas-mensagens',
  templateUrl: './minhas-mensagens.page.html',
  styleUrls: ['./minhas-mensagens.page.scss'],
})
export class MinhasMensagensPage implements OnInit {

  chatUserInteressado: Chat[];
  chatUserContatado: Chat[];
  
  

  colletionMessageUser: AngularFirestoreCollection<Chat>;

  colletionUserInte: AngularFirestoreCollection<Chat>;
  colletionUserPrest: AngularFirestoreCollection<Chat>;


  todoId: any;
  route: any;
  
  prestador = "prestador";
  contratante = "contratante";

  

  constructor(
    private chatService: ChatService, 
    private todoService: TodoService,
    private userService: CadService,
    private db: AngularFirestore, 
    private navCtrl: NavController,
    private af: AngularFireDatabase,
    private avaService: AvaserviceService) {     
  }
    
    
  ngOnInit() {  
    
    
    this.db
    .collection<Chat>("contato", res => {
      return res.where("interessadoId", "==", firebase.auth().currentUser.uid);
    })
    .snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }))
    .subscribe(chatUser => {
      
      this.chatUserInteressado = chatUser;
      
    });

    this.db
    .collection<Chat>("contato", res => {
      return res.where("prestadorId", "==", firebase.auth().currentUser.uid);
    })
    .snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }))
    .subscribe(chatUser => {
      
      this.chatUserContatado = chatUser;
      
    });

    
    


  }
// item.interessadoId, item.prestadorId, item.ofertaId
  goToChat(interessadoId, prestadorId, ofertaId) {

    var a: Cad[];

    console.log("interessado id: "+ interessadoId);

    this.db
    .collection<Cad>("cadastro", res => {
      return res.where("iduser", "==", interessadoId);
    })
    .valueChanges()
    .subscribe(b => {
      
      a = b;
      
    });

  
    

    this.todoService.getTodo(ofertaId);
    console.log("interessado gotochat: "+ a);
    this.chatService.currentChatPairId = this.chatService.createPairId(
      this.userService.getCad(interessadoId),
      this.todoService.getTodo(ofertaId), ofertaId
    );
    
    

    this.navCtrl.navigateForward('chatroom');

  } //goToChat

  // atualizar(){
  //   this.chatService.getChatUser().subscribe(res => {
  //     this.chatUser = res;
  //   });
  // }


  avaliar(idContato, quem){
    console.log(quem);
    this.avaService.startAva(idContato, quem);
    this.navCtrl.navigateForward('rating');
  }
  

  

}
