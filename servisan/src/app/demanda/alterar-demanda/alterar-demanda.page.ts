import { Dem,DemserviceService } from './../services/demservice.service';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alterar-demanda',
  templateUrl: './alterar-demanda.page.html',
  styleUrls: ['./alterar-demanda.page.scss'],
})
export class AlterarDemandaPage implements OnInit {
  dem: Dem = {

    descricao: '',
  
    createdAt: new Date().getTime(),
  }; 
  
  demId = null;
  
  constructor(private route: ActivatedRoute, private nav: NavController, private demService: DemserviceService, private loadingController: LoadingController) { }
  
  ngOnInit() {
    this.demId = this.route.snapshot.params['id'];
    if (this.demId)  {
      this.loadDem();
    }
  }
  
  async loadDem() {
    const loading = await this.loadingController.create({
      message: 'Carregando Dem'
    });
    await loading.present();
  
    this.demService.getDem(this.demId).subscribe(res => {
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
      this.demService.updateDem(this.dem, this.demId).then(() => {
        loading.dismiss();
        this.nav.navigateBack("\home", true);
      });
    } else {
      this.demService.addDem(this.dem).then(() => {
        loading.dismiss();
        this.nav.navigateBack("\home", true);
      });
    }
  }
}
 