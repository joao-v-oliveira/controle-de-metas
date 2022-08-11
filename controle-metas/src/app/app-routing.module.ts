import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioModule) },
  { path: 'cadastro', loadChildren: () => import('./pages/cadastro/cadastro.module').then(m => m.CadastroModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
