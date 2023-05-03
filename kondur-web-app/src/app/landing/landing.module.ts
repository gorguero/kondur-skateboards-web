import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalPageComponent } from './components/principal-page/principal-page.component';
import { CarrucelComponent } from './pages/carrucel/carrucel.component';
import { ProductosDestacadosComponent } from './pages/productos-destacados/productos-destacados.component';
import { IconosLandingComponent } from './pages/iconos-landing/iconos-landing.component';
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
