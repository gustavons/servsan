import { ComponentFixture } from '@angular/core/testing';
import { Cad, CadService } from './../services/user.service';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit {

  cad: Cad = {

  nome: '',
  cpf: '', 
  nasci: '',
  cel: '',
  endereco: '',
  cep: '',
  email:'',
  senha:'',


  createdAt: new Date().getTime(),
}; 

cadId = null;

constructor(private route: ActivatedRoute, 
  private nav: NavController, 
  private cadService: CadService, 
  private loadingController: LoadingController) { }

ngOnInit() {
  this.cadId = this.route.snapshot.params['id'];
  if (this.cadId)  {
    this.loadCad();
  }
}

async loadCad() {
  const loading = await this.loadingController.create({
    message: 'Carregando Cadastro...'
  });
  await loading.present();

  this.cadService.getCad(this.cadId).subscribe(res => {
    loading.dismiss();
    this.cad = res;
  });
}

async saveCad() {

  const loading = await this.loadingController.create({
    message: 'Salvando Cadastro...'
  });
  await loading.present();

  if (this.cadId) {
    this.cadService.updateCad(this.cad, this.cadId).then(() => {
      loading.dismiss();
      this.nav.navigateBack("\home", true);
    });
  } else {
    this.cadService.addCad(this.cad).then(() => {
      loading.dismiss();
      this.nav.navigateBack("\home", true);
    });
  }
}
}
