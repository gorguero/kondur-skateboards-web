import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './sesion/signup/register/register.component';
import { PerfilComponent } from './sesion/usuario/perfil/perfil.component';
import { CarritoComponent } from './shared/header/carrito/carrito.component';
import { LoginComponent } from './sesion/signin/login/login.component';

const routes: Routes = [
  {
    path: 'administrador',
    // component: ProductosComponent
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule)
  },
  {
    path: '',
    loadChildren: () => import('./principal/principal.module').then( m => m.PrincipalModule)
  },
  {
    path: '',
    redirectTo:'principal',
    pathMatch: 'full'
  },

  {//SESION
    path: 'signup',
    component: RegisterComponent
  },
  {//SESION
    path: 'signin',
    component: LoginComponent
  },
  { //SESION
    path: 'perfil',
    component: PerfilComponent
  },

  { //SHARED
    path: 'carrito',
    component: CarritoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
