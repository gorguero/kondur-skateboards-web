import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './components/carrito/carrito.component';
import { SharedModule } from '../shared/shared.module';





@NgModule({
  declarations: [ 
    CarritoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CarritoComponent
  ]
})
export class CarritoModule { }
