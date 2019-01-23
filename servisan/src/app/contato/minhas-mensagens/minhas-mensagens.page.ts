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
import { map, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

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
  dataUser: firebase.firestore.DocumentData;
  dataOferta: firebase.firestore.DocumentData;
  

  

  constructor(
    private chatService: ChatService, 
    private todoService: TodoService,
    private userService: CadService,
    private db: AngularFirestore,
    private navCtrl: NavController,
    private af: AngularFireDatabase,
    private avaService: AvaserviceService,
    private afs: AngularFirestore) {     
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
  goToChat(interessadoId, prestadorId, ofertaId, tipoOferta) {

  

    let userDoc = this.afs.collection("cadastro", res => {
      return res.where("iduser", "==", interessadoId);
    });
    userDoc.get().forEach((querySnapshot) => { 
      querySnapshot.forEach((doc) => {
        this.dataUser = doc.data();  
        console.log("dataUser"+this.dataUser.iduser); 

        // console.log(doc.id, "=>", doc.data().iduser); 

        this.passandoDadosChat(this.dataUser, ofertaId, tipoOferta);



      })//end querySnapshot
    })//end foreach


  } //goToChat

  passandoDadosChat(dataUser, ofertaId, tipoOferta){
    // Pegando documento do serviço 
    if (tipoOferta == "servico"){
      console.log("servico")
      let ofertaDoc = this.afs.collection("servico", res => {
        return res.where(firebase.firestore.FieldPath.documentId(), "==", ofertaId);
      });
      ofertaDoc.get().forEach((querySnapshot) => { 
        querySnapshot.forEach((doc) => {
          this.dataOferta = doc.data(); 
          console.log("dataUser"+dataUser); 

          console.log("dataOferta"+this.dataOferta); 


          // checando pair id para o servico
          this.chatService.currentChatPairId = this.chatService.createPairId(
            dataUser,
            this.dataOferta, ofertaId, tipoOferta
          );
          
          this.navCtrl.navigateForward('chatroom'); 
        })
      })

      
    }// fim do if
    // pegando dado da demanda 
    else{
      console.log("demanda")

      let ofertaDoc = this.afs.collection("demanda", res => {
        return res.where("id", "==", ofertaId);
      });
      ofertaDoc.get().forEach((querySnapshot) => { 
        querySnapshot.forEach((doc) => {
          this.dataOferta = doc.data(); 

          console.log("dataUser"+dataUser); 

          console.log("dataOferta"+this.dataOferta); 
          // checando paid id para demanda  
          this.chatService.currentChatPairId = this.chatService.createPairId(
            dataUser,
            this.dataOferta, ofertaId, tipoOferta
          );
          this.navCtrl.navigateForward('chatroom'); 
        })
      })
      
    }// fim do else

      
  }
    

  // atualizar(){
  //   this.chatService.getChatUser().subscribe(res => {
  //     this.chatUser = res;
  //   });
  // }


  avaliar(idContato, dadocontato){
    console.log( dadocontato);
    this.avaService.startAva(idContato, dadocontato);
    this.navCtrl.navigateForward('rating');
  }
  

  

}
