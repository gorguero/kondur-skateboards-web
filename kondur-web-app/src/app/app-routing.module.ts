import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutHomeComponent } from './principal/home/components/layout-home/layout-home.component';
import { ProductoComponent } from './principal/tienda/pages/producto/producto.component';
import { RegisterComponent } from './sesion/signup/register/register.component';
import { ProductosComponent } from './admin/productos/productos.component';
import { FacturasComponent } from './admin/facturas/facturas.component';
import { ChecksComponent } from './admin/checks/checks.component';
import { PerfilComponent } from './sesion/usuario/perfil/perfil.component';
import { CarritoComponent } from './shared/header/carrito/carrito.component';
import { LoginComponent } from './sesion/signin/login/login.component';
import { LayoutComponent } from './principal/nosotros/components/layout/layout.component';
import { LayoutChecksComponent } from './principal/checks/components/layout-checks/layout-checks.component';
import { LayoutTiendaComponent } from './principal/tienda/components/layout-tienda/layout-tienda.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/home',
    pathMatch: 'full'
  },
  {
    path: 'home', 
    component: LayoutHomeComponent
  },
  {
    path: 'tienda', 
    component: LayoutTiendaComponent
  },
  {
    path: 'producto', 
    component: ProductoComponent
  },
  {
    path: 'checks',
    component: LayoutChecksComponent
  },
  {
    path: 'nosotros',
    component: LayoutComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'signin',
    component: LoginComponent
  },
  {
    path: 'admin/productos',
    component: ProductosComponent
  },
  {
    path: 'admin/facturas',
    component: FacturasComponent
  },
  {
    path: 'admin/checks',
    component: ChecksComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'carrito',
    component: CarritoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
