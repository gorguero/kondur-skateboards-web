import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalPageComponent } from './landing/components/principal-page/principal-page.component';
import { ProductoComponent } from './tienda/pages/producto/producto.component';
import { TiendaPageComponent } from './tienda/components/tienda-page/tienda-page.component';
import { ChecksPrincipalComponent } from './checks/components/checks-principal/checks-principal.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
