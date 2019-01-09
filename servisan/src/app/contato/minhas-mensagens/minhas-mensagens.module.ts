import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MinhasMensagensPage } from './minhas-mensagens.page';

const routes: Routes = [
  {
    path: '',
    component: MinhasMensagensPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MinhasMensagensPage]
})
export class MinhasMensagensPageModule {}
