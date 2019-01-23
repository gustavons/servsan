import { AvaserviceService, Ava } from './../services/avaservice.service';
import { Component, Input, Output, EventEmitter,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage {
  ava:Ava;
  @Input() numStars: number = 5;
  @Input() value: number = 1;
  
  avaliacao= 0;

  @Output() ionClick: EventEmitter<number> = new EventEmitter<number>();

  stars: String[] = [];

  constructor(private Avaservice: AvaserviceService, private db:AngularFirestore) {}

  ngAfterViewInit(){
    this.calc();
    }
    calc(){
    this.stars = []; 
    let tmp = this.value;
    for (let i=-0; i < this.numStars; i++, tmp--){
      if(tmp >= 1)
      this.stars.push("star");
    else if(tmp > 0 && tmp < 1)
      this.stars.push("star-half");
    else this.stars.push("star-outline");
    }
  }
  salvaravaliacao(){
    
    var colletionPairUser = this.db.collection<Ava>('avaliacao', ref => 
      ref.where('idcontato', '==',this.Avaservice.idContato ));
    
    colletionPairUser.snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    ).subscribe(snapshot => {
      if(snapshot.length == 0) {  
        console.log('Piar id match NOT found')
        var avaliadorId;
        var avaliadoId;

        if(this.Avaservice.dadocontato[0].prestadorId == firebase.auth().currentUser.uid){
          avaliadorId = this.Avaservice.dadocontato[0].prestadorId;
          avaliadoId = this.Avaservice.dadocontato[0].interessadoId;
        }else{
          avaliadorId = firebase.auth().currentUser.uid;
          avaliadoId = this.Avaservice.dadocontato[0].prestadorId;
        }

        this.ava = {
          pontos: this.value,
          createdAt: new Date().getTime(),
          idavaliador: avaliadorId,
          idavaliado: avaliadoId,
          idcontato: this.Avaservice.idContato,
          idoferta: this.Avaservice.dadocontato[0].ofertaId,
          tipoferta: this.Avaservice.dadocontato[0].tipoOferta,
        };
        this.Avaservice.addAva(this.ava)
        
       


      } else {
        console.log('Pair id match found for user' + snapshot[0].id )
        


      }
    });







    
  }

  starClicked(index){
    console.log(index);
    this.value = index + 1;
    this.ionClick.emit(this.value);
    this.calc();
  }

}
