import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastrarDemandaPage } from './cadastrar-demanda.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrarDemandaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastrarDemandaPage]
})
export class CadastrarDemandaPageModule {}
