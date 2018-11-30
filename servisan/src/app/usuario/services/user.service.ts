import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
export interface Cad {
  id?: string;
  nome: '',
  cpf: '', 
  nasci: '',
  cel: '',
  endereco: '',
  cep: '',
  email:'',
  senha:'',
  createdAt: number,
}; 

 
@Injectable({
  providedIn: 'root'
})
export class CadService {
  private cadsCollection: AngularFirestoreCollection<Cad>;
 
  private cads: Observable<Cad[]>;
 
  constructor(db: AngularFirestore) {
    this.cadsCollection = db.collection<Cad>('Cadastro');
 
    this.cads = this.cadsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getCads() {
    return this.cads;
  }
 
  getCad(id) {
    return this.cadsCollection.doc<Cad>(id).valueChanges();
  }
 
  updateCad(cad: Cad, id: string) {
    return this.cadsCollection.doc(id).update(cad);
  }
 
  addCad(cad: Cad) {
    return this.cadsCollection.add(cad);
  }
 
  removeCad(id) {
    return this.cadsCollection.doc(id).delete();
  }
}