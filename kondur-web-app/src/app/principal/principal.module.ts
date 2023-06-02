import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LayoutChecksComponent } from './checks/layout-checks/layout-checks.component';
import { ArticulosComponent } from './checks/components/articulos/articulos.component';
import { LayoutHomeComponent } from './home/layout-home/layout-home.component';
import { ProductosDestacadosComponent } from './home/components/productos-destacados/productos-destacados.component';
import { CarrucelComponent } from './home/components/carrucel/carrucel.component';
import { IconosLandingComponent } from './home/components/iconos-landing/iconos-landing.component';
import { NosotrosComponent } from './nosotros/components/nosotros/nosotros.component';
import { LayoutNosotrosComponent } from './nosotros/layout-nosotros/layout-nosotros.component';
import { CorredoresComponent } from './nosotros/components/corredores/corredores.component';
import { LayoutTiendaComponent } from './tienda/layout-tienda/layout-tienda.component';
import { ProductoComponent } from './tienda/components/producto/producto.component';
import { PrincipalRoutingModule } from './principal-routing.module';
import { LandingComponent } from './home/components/landing/landing.component';



@NgModule({
  declarations: [
    LayoutChecksComponent,
    ArticulosComponent,

    LayoutHomeComponent,
    CarrucelComponent,
    IconosLandingComponent,
    ProductosDestacadosComponent,

    LayoutNosotrosComponent,
    CorredoresComponent,
    NosotrosComponent,

    LayoutTiendaComponent,
    ProductoComponent,
    LandingComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    PrincipalRoutingModule
  ],
  exports:[
    LandingComponent,
    LayoutChecksComponent,
    LayoutHomeComponent,
    LayoutNosotrosComponent,
    LayoutTiendaComponent
  ]
})
export class PrincipalModule { }
