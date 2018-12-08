import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VisualizarDemandaPage } from './visualizar-demanda.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarDemandaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VisualizarDemandaPage]
})
export class VisualizarDemandaPageModule {}
