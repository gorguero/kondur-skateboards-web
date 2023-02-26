import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalPageComponent } from './landing/components/principal-page/principal-page.component';
import { ProductoComponent } from './tienda/pages/producto/producto.component';
import { TiendaPageComponent } from './tienda/components/tienda-page/tienda-page.component';
import { ChecksPrincipalComponent } from './checks/components/checks-principal/checks-principal.component';
import { NosotrosPrincipalComponent } from './nosotros/components/nosotros-principal/nosotros-principal.component';
import { RegisterComponent } from './signup/components/register/register.component';
import { ProductosComponent } from './admin/productos/productos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/home',
     pathMatch: 'full'
  },
  {
    path: 'home', 
    component: PrincipalPageComponent
  },
  {
    path: 'tienda', 
    component: TiendaPageComponent},
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
    path: 'admin',
    component: ProductosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
