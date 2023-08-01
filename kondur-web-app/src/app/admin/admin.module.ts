import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Componentes
import { ProductosComponent } from './pages/productos/productos.component';
import { SharedModule } from '../shared/shared.module';
import { ChecksComponent } from './pages/checks/checks.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { VentasComponent } from './pages/ventas/ventas.component';
import { TeamComponent } from './pages/team/team.component';
import { ProductoComponent } from './components/producto/producto.component';



@NgModule({
  declarations: [
    ProductosComponent,
    VentasComponent,
    ChecksComponent,
    LayoutAdminComponent,
    TeamComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    LayoutAdminComponent
  ]
})
export class AdminModule { }
