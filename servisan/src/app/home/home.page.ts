import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { AlterarServicoPage } from '../alterar-servico/alterar-servico.page';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 
  todos: Todo[];

  constructor(private todoService: TodoService, public modal: ModalController) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
    });
  }
  // editar(id){
  //   this.modal.create(AlterarServicoPage, {id: item.id}).present();
  // }

  remove(item) {
    this.todoService.removeTodo(item.id);
  }
}