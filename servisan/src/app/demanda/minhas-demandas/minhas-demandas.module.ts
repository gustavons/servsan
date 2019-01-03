import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MinhasDemandasPage } from './minhas-demandas.page';

const routes: Routes = [
  {
    path: '',
    component: MinhasDemandasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MinhasDemandasPage]
})
export class MinhasDemandasPageModule {}
