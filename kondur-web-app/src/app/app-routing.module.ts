import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutHomeComponent } from './principal/home/layout-home/layout-home.component';
import { ProductoComponent } from './principal/tienda/components/producto/producto.component';
import { RegisterComponent } from './sesion/signup/register/register.component';
import { ProductosComponent } from './admin/productos/productos.component';
import { FacturasComponent } from './admin/facturas/facturas.component';
import { ChecksComponent } from './admin/checks/checks.component';
import { PerfilComponent } from './sesion/usuario/perfil/perfil.component';
import { CarritoComponent } from './shared/header/carrito/carrito.component';
import { LoginComponent } from './sesion/signin/login/login.component';
import { LayoutNosotrosComponent } from './principal/nosotros/layout-nosotros/layout-nosotros.component';
import { LayoutChecksComponent } from './principal/checks/layout-checks/layout-checks.component';
import { LayoutTiendaComponent } from './principal/tienda/layout-tienda/layout-tienda.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./principal/principal.module').then( m => m.PrincipalModule)
  },
  {
    path: '',
    redirectTo:'principal',
    pathMatch: 'full'
  },

  // { //PRINCIPAL
  //   path: 'home', 
  //   component: LayoutHomeComponent
  // },
  // {//PRINCIPAL
  //   path: 'tienda', 
  //   component: LayoutTiendaComponent
  // },
  // {//PRINCIPAL
  //   path: 'producto', 
  //   component: ProductoComponent
  // },
  // {//PRINCIPAL
  //   path: 'checks',
  //   component: LayoutChecksComponent
  // },
  // {//PRINCIPAL
  //   path: 'nosotros',
  //   component: LayoutNosotrosComponent
  // },

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

  { //ADMIN
    path: 'admin/productos',
    component: ProductosComponent
  },
  {//ADMIN
    path: 'admin/facturas',
    component: FacturasComponent
  },
  {//ADMIN
    path: 'admin/checks',
    component: ChecksComponent
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
