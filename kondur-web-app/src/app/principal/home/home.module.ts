import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { LayoutHomeComponent } from './components/layout-home/layout-home.component';
import { CarrucelComponent } from './components/carrucel/carrucel.component';
import { IconosLandingComponent } from './components/iconos-landing/iconos-landing.component';
import { ProductosDestacadosComponent } from './components/productos-destacados/productos-destacados.component';



@NgModule({
  declarations: [
    LayoutHomeComponent,
    CarrucelComponent,
    IconosLandingComponent,
    ProductosDestacadosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    LayoutHomeComponent
  ]
})
export class HomeModule { }
