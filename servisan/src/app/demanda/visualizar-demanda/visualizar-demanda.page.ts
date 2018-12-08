import { Dem, DemserviceService } from './../services/demservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-demanda',
  templateUrl: './visualizar-demanda.page.html',
  styleUrls: ['./visualizar-demanda.page.scss'],
})
export class VisualizarDemandaPage implements OnInit {
  
  demandas: Dem[];

  constructor(private DemserviceService: DemserviceService) { }

  ngOnInit() {
    this.DemserviceService.getDems().subscribe(res => {
      this.demandas = res;
    });
  }
  // editar(id){
  //   this.modal.create(AlterarServicoPage, {id: item.id}).present();
  // }

  remove(item) {
    this.DemserviceService.removeDem(item.id);
  }
}
