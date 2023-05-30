import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ProductoComponent } from './pages/producto/producto.component';
import { RouterModule } from '@angular/router';
import { LayoutTiendaComponent } from './components/layout-tienda/layout-tienda.component';



@NgModule({
  declarations: [
    LayoutTiendaComponent,
    ProductoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    LayoutTiendaComponent
  ]
})
export class TiendaModule { }
