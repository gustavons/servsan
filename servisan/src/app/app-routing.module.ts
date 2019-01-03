import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'servico', loadChildren: './servico/cadastrar_servico/servico.module#ServicoPageModule' },
  { path: 'alterar-servico/:id', loadChildren: './servico/alterar-servico/alterar-servico.module#AlterarServicoPageModule' },
  { path: 'cadastro-usuario', loadChildren: './usuario/cadastro-usuario/cadastro-usuario.module#CadastroUsuarioPageModule' },
  { path: 'visualizar-usuario', loadChildren: './usuario/visualizar-usuario/visualizar-usuario.module#VisualizarUsuarioPageModule' },
  { path: 'alterar-usuario/:id', loadChildren: './usuario/alterar-usuario/alterar-usuario.module#AlterarUsuarioPageModule' },
  { path: 'cadastrar-demanda', loadChildren: './demanda/cadastrar-demanda/cadastrar-demanda.module#CadastrarDemandaPageModule' },
  { path: 'alterar-demanda/:id', loadChildren: './demanda/alterar-demanda/alterar-demanda.module#AlterarDemandaPageModule' },
  { path: 'visualizar-demanda', loadChildren: './demanda/visualizar-demanda/visualizar-demanda.module#VisualizarDemandaPageModule' },
  { path: 'buscar-servico', loadChildren: './servico/buscar-servico/buscar-servico.module#BuscarServicoPageModule' },
  { path: 'login', loadChildren: './login/login/login.module#LoginPageModule' },
  { path: 'detalhe-servico/:id', loadChildren: './servico/detalhe-servico/detalhe-servico.module#DetalheServicoPageModule' },
  { path: 'cadastro-usuario/:id', loadChildren: './usuario/cadastro-usuario/cadastro-usuario.module#CadastroUsuarioPageModule' },
  { path: 'chats', loadChildren: './contato/chats/chats.module#ChatsPageModule' },
  { path: 'chatroom', loadChildren: './contato/chatroom/chatroom.module#ChatroomPageModule' },
  { path: 'rating/:id', loadChildren: './avaliacao/rating/rating.module#RatingPageModule' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }