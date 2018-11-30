import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'servico', loadChildren: './servico/cadastrar_servico/servico.module#ServicoPageModule' },
  { path: 'alterar-servico/:id', loadChildren: './servico/alterar-servico/alterar-servico.module#AlterarServicoPageModule' },
  { path: 'cadastro_usuario', loadChildren: './usuario/cadastro-usuario/cadastro-usuario.module#CadastroUsuarioPageModule' },
  { path: 'visualizar_usuario', loadChildren: './usuario/visualizar-usuario/visualizar-usuario.module#VisualizarUsuarioPageModule' },
  { path: 'alterar-usuario', loadChildren: './usuario/alterar-usuario/alterar-usuario.module#AlterarUsuarioPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
