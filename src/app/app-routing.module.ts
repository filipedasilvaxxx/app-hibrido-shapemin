import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './servico/auth.Guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  


  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',


  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },

  {
    path: 'cadastro-de-loja',
    loadChildren: './cadastro-de-loja/cadastro-de-loja.module#CadastroDeLojaPageModule',
  },

  {
    path: 'cadastro-de-produto',
    loadChildren: './cadastro-de-produto/cadastro-de-produto.module#CadastroDeProdutoPageModule'
  },

  {
    path: 'loja-perfil',
    loadChildren: './loja-perfil/loja-perfil.module#LojaPerfilPageModule'
  },

  {
    path: 'logoff',
    loadChildren: './logoff/logoff.module#LogoffPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'home-cliente', loadChildren: './home-cliente/home-cliente.module#HomeClientePageModule' },

  { path: 'whey-list', loadChildren: './whey-list/whey-list.module#WheyListPageModule' },

  { path: 'creatine-list', loadChildren: './creatine-list/creatine-list.module#CreatineListPageModule' },

  { path: 'tribulus-list', loadChildren: './tribulus-list/tribulus-list.module#TribulusListPageModule' },

  { path: 'bcaa-list', loadChildren: './bcaa-list/bcaa-list.module#BcaaListPageModule' },

  { path: 'carrinho', loadChildren: './carrinho/carrinho.module#CarrinhoPageModule' },

  { path: 'imc', loadChildren: './imc/imc.module#ImcPageModule' },  { path: 'select-more', loadChildren: './select-more/select-more.module#SelectMorePageModule' },
  { path: 'quem-somos', loadChildren: './quem-somos/quem-somos.module#QuemSomosPageModule' },
  { path: 'sujestao', loadChildren: './sujestao/sujestao.module#SujestaoPageModule' },


  




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
