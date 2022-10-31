import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalPageComponent } from './landing/principal-page/principal-page.component';
import { ProductoComponent } from './tienda/producto/producto.component';
import { TiendaPageComponent } from './tienda/tienda-page/tienda-page.component';

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  {path: 'home', component: PrincipalPageComponent},
  {path: 'tienda', component: TiendaPageComponent},
  {path: 'producto', component: ProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
