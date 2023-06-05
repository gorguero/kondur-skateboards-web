import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './components/productos/productos.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FacturasComponent } from './components/facturas/facturas.component';
import { ChecksComponent } from './components/checks/checks.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    ProductosComponent,
    FacturasComponent,
    ChecksComponent,
    LayoutAdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AdminRoutingModule
  ],
  exports:[
    LayoutAdminComponent
  ]
})
export class AdminModule { }
