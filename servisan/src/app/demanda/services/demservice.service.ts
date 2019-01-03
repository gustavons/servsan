import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Dem {
  id?: string;
  isuser?: string;
  descricao: string,
  
  createdAt: number,
}; 

 
@Injectable({
  providedIn: 'root'
})
export class DemserviceService {
  private demsCollection: AngularFirestoreCollection<Dem>;
 
  private dems: Observable<Dem[]>;
 
  constructor(db: AngularFirestore) {
    this.demsCollection = db.collection<Dem>('Demanda');
 
    this.dems = this.demsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getDems() {
    this.dems = this.demsCollection.valueChanges();
    this.dems = this.demsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.dems;
  }
 
  getDem(id) {
    return this.demsCollection.doc<Dem>(id).valueChanges();
  }
 
  updateDem(dem: Dem, id: string) {
    return this.demsCollection.doc(id).update(dem);
  }
 
  addDem(dem: Dem) {
    return this.demsCollection.add(dem);
  }
 
  removeDem(id) {
    return this.demsCollection.doc(id).delete();
  }
}
