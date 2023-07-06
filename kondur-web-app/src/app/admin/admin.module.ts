import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './components/productos/productos.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ChecksComponent } from './components/checks/checks.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { VentasComponent } from './components/ventas/ventas.component';
import { TeamComponent } from './components/team/team.component';



@NgModule({
  declarations: [
    ProductosComponent,
    VentasComponent,
    ChecksComponent,
    LayoutAdminComponent,
    TeamComponent
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
