import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './sesion/components/register/register.component';
import { PerfilComponent } from './sesion/components/perfil/perfil.component';
import { CarritoComponent } from './shared/header/carrito/carrito.component';
import { LoginComponent } from './sesion/components/login/login.component';

const routes: Routes = [
  {
    path: 'administrador',
    // component: ProductosComponent
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule)
  },
  {
    path: 'sesion',
    loadChildren: () => import('./sesion/sesion.module').then( m => m.SesionModule)
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

  // {//SESION
  //   path: 'signup',
  //   component: RegisterComponent
  // },
  // {//SESION
  //   path: 'signin',
  //   component: LoginComponent
  // },
  // { //SESION
  //   path: 'perfil',
  //   component: PerfilComponent
  // },

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
