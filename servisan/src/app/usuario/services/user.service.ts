import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
 
export interface Cad {
  id?: string;
  iduser?: string;
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
   
    constructor(public fAuth: AngularFireAuth,db: AngularFirestore) {
      this.cadsCollection = db.collection<Cad>('cadastro');
   
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
   
    async addCad(cad: Cad) {
      var r = await this.fAuth.auth.createUserWithEmailAndPassword(
        cad.email,
        cad.senha
      );
      cad.iduser = r.user.uid;
      cad.email = "";
      cad.senha ="";
      return this.cadsCollection.add(cad);
    }

     
  
  //   async register() {
  //     try {
  //       var r = await this.fAuth.auth.createUserWithEmailAndPassword(
  //         this.user.email,
  //         this.user.password
  //       );
  //       if (r) {
  //         console.log("Successfully registered!");
  //         this.navCtrl.setRoot('LoginPage');
  //       }
  
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // }
   
    removeCad(id) {
      return this.cadsCollection.doc(id).delete();
    }
  }