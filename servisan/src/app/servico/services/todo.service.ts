import { CadService } from './../../usuario/services/user.service';
import { User } from './../../login/services/email-login.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
// import { userInfo } from 'os';
 
export interface Todo {
  id?: string;
  isuser?: string;
  // fotos: string;
  descricao:string;
  createdAt: number;
}
 
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosCollection: AngularFirestoreCollection<Todo>;
 
  private todos: Observable<Todo[]>;

  private cadUser = null;
 
  constructor(db: AngularFirestore,  private cadService: CadService) {

    this.todosCollection = db.collection<Todo>('servico');
    this.cadUser = cadService;
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getTodos( ) {
    // this.todosCollection = db.collection<Todo>('servico');
 
    this.todos = this.todosCollection.valueChanges();
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.todos;
    
  }
 
  getTodo(id) {
    return this.todosCollection.doc<Todo>(id).valueChanges();
  }
 
  updateTodo(todo: Todo, id: string) {
    return this.todosCollection.doc(id).update(todo);
  }
 
  addTodo(todo: Todo) {
    // var a = this.cadUser.getCurrentUser();
    // console.log('A informacao de data todo ' + this.cadUser.getCurrentUser());

    todo.isuser = firebase.auth().currentUser.uid;
    return this.todosCollection.add(todo);
  }
 
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }
}