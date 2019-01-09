import { Component, OnInit } from '@angular/core';
import { Dem, DemserviceService } from '../services/demservice.service';

@Component({
  selector: 'app-minhas-demandas',
  templateUrl: './minhas-demandas.page.html',
  styleUrls: ['./minhas-demandas.page.scss'],
})
export class MinhasDemandasPage implements OnInit {

  demandas: Dem[];

  constructor(private DemserviceService: DemserviceService) { }

  ngOnInit() {
    this.DemserviceService.getDemandasUser().subscribe(res => {
      this.demandas = res;
    });
  }
  // editar(id){
  //   this.modal.create(AlterarServicoPage, {id: item.id}).present();
  // }

  remove(item) {
    this.DemserviceService.removeDem(item.id);
  }

  atualizar(){
    this.DemserviceService.getDemandasUser().subscribe(res => {
      this.demandas = res;
    });
  }

  


  getItems(ev: any) {
    

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val.length >0) {
     
      console.log("Entrou");
      console.log(this.demandas[0].descricao);
      this.demandas =  this.demandas.filter((v) => {
        if(v.descricao && val) {
          if (v.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      
      });
    } else {
       // Reset items back to all of the items
       this.atualizar();
    }
    console.log(val, this.demandas.length);
  };

}
