import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutHomeComponent } from './principal/home/components/layout-home/layout-home.component';
import { ProductoComponent } from './tienda/pages/producto/producto.component';
import { TiendaPageComponent } from './tienda/components/tienda-page/tienda-page.component';
import { ChecksPrincipalComponent } from './checks/components/checks-principal/checks-principal.component';
import { NosotrosPrincipalComponent } from './nosotros/components/nosotros-principal/nosotros-principal.component';
import { RegisterComponent } from './signup/components/register/register.component';
import { ProductosComponent } from './admin/productos/productos.component';
import { FacturasComponent } from './admin/facturas/facturas.component';
import { ChecksComponent } from './admin/checks/checks.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { CarritoComponent } from './shared/header/carrito/carrito.component';
import { LoginComponent } from './signin/login/login.component';

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
    component: TiendaPageComponent
  },
  {
    path: 'producto', 
    component: ProductoComponent
  },
  {
    path: 'checks',
    component: ChecksPrincipalComponent
  },
  {
    path: 'nosotros',
    component: NosotrosPrincipalComponent
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
