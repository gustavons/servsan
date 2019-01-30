import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { TodoService } from 'src/app/servico/services/todo.service';
import { ChatService } from 'src/app/contato/services/chats.service';
import * as firebase from 'firebase';
import { DemserviceService, Dem } from '../services/demservice.service';

@Component({
  selector: 'app-detalhe-demanda',
  templateUrl: './detalhe-demanda.page.html',
  styleUrls: ['./detalhe-demanda.page.scss'],
})
export class DetalheDemandaPage implements OnInit {

  dem: Dem = {
    descricao:'',

    createdAt: new Date().getTime(),

  };
  demId = null;

 



  constructor(private route: ActivatedRoute, private nav: NavController, 
    private demserviceService: DemserviceService, 
    private chatService: ChatService,
    private navCtrl: NavController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.demId = this.route.snapshot.params['id'];
    if (this.demId)  {
      this.loadDem();
    }
  }

  async loadDem() {
    const loading = await this.loadingController.create({
      message: 'Carregando Demanda..'
    });
    await loading.present();

    this.demserviceService.getDem(this.demId).subscribe(res => {
      loading.dismiss();
      this.dem = res;
    });
  }

  async saveDem() {

    const loading = await this.loadingController.create({
      message: 'Salvando Demanda...'
    });
    await loading.present();

    if (this.demId) {
      this.demserviceService.updateDem(this.dem, this.demId).then(() => {
        loading.dismiss();
        this.nav.navigateBack("\home", true);
      });
    } else {
      this.demserviceService.addDem(this.dem).then(() => {
        loading.dismiss();
        this.nav.navigateBack("\home", true);
      });
    }
  }

  goToChat(ofertaData, idOferta) {
    
    this.chatService.currentChatPairId = this.chatService.createPairId(
      firebase.auth().currentUser,
      ofertaData, idOferta, "demanda"
    );
    
    

    this.navCtrl.navigateForward('chatroom');

  }

}
