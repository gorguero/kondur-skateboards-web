import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaPageComponent } from './components/tienda-page/tienda-page.component';
import { SharedModule } from '../shared/shared.module';
import { ProductoComponent } from './pages/producto/producto.component';



@NgModule({
  declarations: [
    TiendaPageComponent,
    ProductoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TiendaPageComponent
  ]
})
export class TiendaModule { }
