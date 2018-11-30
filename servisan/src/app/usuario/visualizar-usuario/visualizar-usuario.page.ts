import { Cad, CadService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-usuario',
  templateUrl: './visualizar-usuario.page.html',
  styleUrls: ['./visualizar-usuario.page.scss'],
})
export class VisualizarUsuarioPage implements OnInit {

  usuarios: Cad[];

  constructor(private userService: CadService) { }

  ngOnInit() {
    this.userService.getCads().subscribe(res => {
      this.usuarios = res;
    });
  }
  // editar(id){
  //   this.modal.create(AlterarServicoPage, {id: item.id}).present();
  // }

  remove(item) {
    this.userService.removeCad(item.id);
  }
}
