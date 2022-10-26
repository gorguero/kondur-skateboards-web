import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalPageComponent } from './principal-page/principal-page.component';
import { CarrucelComponent } from './contenido-landing/carrucel/carrucel.component';



@NgModule({
  declarations: [
    PrincipalPageComponent,
    CarrucelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PrincipalPageComponent
  ]
})
export class LandingModule { }
