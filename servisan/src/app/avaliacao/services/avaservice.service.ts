import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Ava {
  id?: string;
  pontos: number;
  createdAt: number;
  idavaliador: string;
  idavaliado: string;
  idoferta: string;
  tipoferta: string;
  idcontato: string;
}

@Injectable({
  providedIn: 'root'
})
export class AvaserviceService {
  private avaliCollection: AngularFirestoreCollection<Ava>;

  private avali: Observable<Ava[]>;

  idContato;
  dadocontato: any;

  constructor(db: AngularFirestore) {
    this.avaliCollection = db.collection<Ava>('avaliacao');

    this.avali = this.avaliCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }
   getAvali( ) {
    // this.todosCollection = db.collection<Todo>('servico');
 
    this.avali = this.avaliCollection.valueChanges();
    this.avali = this.avaliCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.avali;
    
  }
 
  getAva(id) {
    return this.avaliCollection.doc<Ava>(id).valueChanges();
  }
 
  updateAva(aval: Ava, id: string) {
    return this.avaliCollection.doc(id).update(aval);
  }
 
  addAva(ava: Ava) {
    return this.avaliCollection.add(ava);
  }
 
  removeAva(id) {
    return this.avaliCollection.doc(id).delete();
  }


  startAva(idContato, dadocontato){
    this.idContato = idContato;
    this.dadocontato = dadocontato;
  }
}
