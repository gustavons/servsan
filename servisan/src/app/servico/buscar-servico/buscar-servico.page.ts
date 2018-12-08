import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo, TodoService } from '../services/todo.service';
import { NavController, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-buscar-servico',
  templateUrl: './buscar-servico.page.html',
  styleUrls: ['./buscar-servico.page.scss'],
})
export class BuscarServicoPage implements OnInit {

  todos: Todo[];

  constructor(private todoService: TodoService, public modal: ModalController) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
    });
  }

  atualizar(){
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
    });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.atualizar();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val.length >0) {
      console.log("Entrou");
      console.log(this.todos[0].descricao);
      this.todos =  this.todos.filter((v) => {
        if(v.descricao && val) {
          if (v.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      
      });
    }
    console.log(val, this.todos.length);
  };
  

}
