import { Dem, DemserviceService } from './../services/demservice.service';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-demanda',
  templateUrl: './cadastrar-demanda.page.html',
  styleUrls: ['./cadastrar-demanda.page.scss'],
})
export class CadastrarDemandaPage implements OnInit {

  dem: Dem = {
    descricao:'',

    createdAt: new Date().getTime(),

  };
  demId = null;

  constructor(private route: ActivatedRoute, private nav: NavController, private demserviceService: DemserviceService, private loadingController: LoadingController) { }

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
}
