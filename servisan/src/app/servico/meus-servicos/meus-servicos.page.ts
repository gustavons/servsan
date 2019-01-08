import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { 
  AngularFireDatabase, 
  AngularFireList } from 'angularfire2/database';


@Component({
  selector: 'app-meus-servicos',
  templateUrl: './meus-servicos.page.html',
  styleUrls: ['./meus-servicos.page.scss'],
})
export class MeusServicosPage implements OnInit {

  todos: Todo[];
  

  colletionServicesUser: AngularFirestoreCollection<Todo>;
  
  myServices;
  dados: AngularFireList<{}>;
  

  constructor(private todoService: TodoService, private fireStore: AngularFirestore, private af: AngularFireDatabase) {     
  }
    
    
  ngOnInit() {    
    this.todoService.getTodosUser().subscribe(res => {
      this.todos = res;
    });
  }

  atualizar(){
    this.todoService.getTodosUser().subscribe(res => {
      this.todos = res;
    });
  }

  getItems(ev: any) {
    

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
    } else {
       // Reset items back to all of the items
       this.atualizar();
    }
    console.log(val, this.todos.length);
  };
  

}
