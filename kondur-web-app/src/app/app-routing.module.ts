import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarritoComponent } from './shared/header/carrito/carrito.component';
import { VentasComponent } from './admin/components/ventas/ventas.component';

const routes: Routes = [
  {
    path: 'ventas', component: VentasComponent
  },
  {
    path: 'administrador',
    // component: ProductosComponent
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule)
  },
  {
    path: 'sesion',
    loadChildren: () => import('./sesion/sesion.module').then( m => m.SesionModule)
  },
  { //SHARED
    path: 'carrito',
    component: CarritoComponent
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
