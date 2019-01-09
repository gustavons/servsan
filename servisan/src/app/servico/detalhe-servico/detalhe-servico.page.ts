import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ChatService } from 'src/app/contato/services/chats.service';

@Component({
  selector: 'app-detalhe-servico',
  templateUrl: './detalhe-servico.page.html',
  styleUrls: ['./detalhe-servico.page.scss'],
})
export class DetalheServicoPage implements OnInit {
  todo: Todo; 
  
  // Todo = {
  //   // fotos: '',
  //   descricao: '',  
  //   createdAt: new Date().getTime(),
  // }; 
 
  todoId = null;
 
  constructor(private route: ActivatedRoute, private nav: NavController, 
    private todoService: TodoService, 
    private chatService: ChatService,
    private navCtrl: NavController,
    private loadingController: LoadingController) { }
 
  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId)  {
      this.loadTodo();
    }
  }
 
  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();
 
    this.todoService.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
    });
  }
 
  async saveTodo() {
 
    const loading = await this.loadingController.create({
      message: 'Salvando Serviço...'
    });
    await loading.present();
 
    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateBack("\home", true);
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.navigateBack("\home", true);
      });
    }
  }

  goToChat(ofertaData, idOferta) {
    
    this.chatService.currentChatPairId = this.chatService.createPairId(
      firebase.auth().currentUser,
      ofertaData, idOferta
    );
    
    

    this.navCtrl.navigateForward('chatroom');

  } //goToChat
  // editar(){
  //   this.nav.navigateBack("\alterar-servico/"+this.todoId, true);
  // }
 
 
}

