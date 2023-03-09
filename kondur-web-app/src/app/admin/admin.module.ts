import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos/productos.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FacturasComponent } from './facturas/facturas.component';
import { ChecksComponent } from './checks/checks.component';



@NgModule({
  declarations: [
    ProductosComponent,
    FacturasComponent,
    ChecksComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    ProductosComponent
  ]
})
export class AdminModule { }
