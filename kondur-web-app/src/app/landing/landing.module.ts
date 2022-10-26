import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalPageComponent } from './principal-page/principal-page.component';
import { CarrucelComponent } from './contenido-landing/carrucel/carrucel.component';
import { ProductosDestacadosComponent } from './contenido-landing/productos-destacados/productos-destacados.component';
import { IconosLandingComponent } from './contenido-landing/iconos-landing/iconos-landing.component';



@NgModule({
  declarations: [
    PrincipalPageComponent,
    CarrucelComponent,
    ProductosDestacadosComponent,
    IconosLandingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PrincipalPageComponent
  ]
})
export class LandingModule { }
