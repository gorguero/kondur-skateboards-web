import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalPageComponent } from './principal-page/principal-page.component';
import { CarrucelComponent } from './contenido-landing/carrucel/carrucel.component';
import { ProductosDestacadosComponent } from './contenido-landing/productos-destacados/productos-destacados.component';



@NgModule({
  declarations: [
    PrincipalPageComponent,
    CarrucelComponent,
    ProductosDestacadosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PrincipalPageComponent
  ]
})
export class LandingModule { }
