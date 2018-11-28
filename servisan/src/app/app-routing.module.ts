import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'servico', loadChildren: './servico/cadastrar_servico/servico.module#ServicoPageModule' },
  { path: 'alterar-servico/:id', loadChildren: './servico/alterar-servico/alterar-servico.module#AlterarServicoPageModule' },
  { path: 'servico/:id', loadChildren: './servico/cadastrar_servico/servico.module#ServicoPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
