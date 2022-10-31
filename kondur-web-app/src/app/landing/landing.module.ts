import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalPageComponent } from './principal-page/principal-page.component';
import { CarrucelComponent } from './contenido-landing/carrucel/carrucel.component';
import { ProductosDestacadosComponent } from './contenido-landing/productos-destacados/productos-destacados.component';
import { IconosLandingComponent } from './contenido-landing/iconos-landing/iconos-landing.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PrincipalPageComponent,
    CarrucelComponent,
    ProductosDestacadosComponent,
    IconosLandingComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PrincipalPageComponent
  ]
})
export class LandingModule { }
