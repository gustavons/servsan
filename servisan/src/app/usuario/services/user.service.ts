import { Firebase } from '@ionic-native/firebase/ngx';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
 
export interface Cad {
  id?: string;
  iduser?: string;
  nome: string,
  cpf: string, 
  nasci: string,
  cel: string,
  endereco: string,
  cep: string,
  email:string,
  senha:string,
  createdAt: number,
};
  
   
  @Injectable({
    providedIn: 'root'
  })
  export class CadService {
    private cadsCollection: AngularFirestoreCollection<Cad>;
   
    private cads: Observable<Cad[]>;
   
    constructor(public fAuth: AngularFireAuth, private db: AngularFirestore) {
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

    getCadAtualizado(id) {

      var cadsCollection = this.db.collection<Cad>('cadastro');
      var cads: Observable<Cad[]>;
      cads = cadsCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );

      return cadsCollection.doc<Cad>(id).valueChanges();
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
      // cad.email = "";
      cad.senha ="";
      return this.cadsCollection.add(cad);
    }

     
    // getCurrentUser() {
    //   this.fAuth.authState.subscribe(data => {
    //     console.log('A informacao de data ' + data.uid);
    //     return data;
    //   });
      
    // }

    // getUid() {
    //   a =  this.getCurrentUser();
    //   console.log('A informacao de data ' + a.uid);
    //   return a;
      
    // }
  
    // getUserFirstName() {
    //   this.profileData = this.afData.object(`profile/` + this.getCurrentUser());
    //   return this.profileData;
    // }
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