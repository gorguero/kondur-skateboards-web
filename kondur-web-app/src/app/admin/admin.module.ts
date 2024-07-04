import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


// Componentes
import { ProductosComponent } from './pages/productos/productos.component';
import { SharedModule } from '../shared/shared.module';
import { ChecksComponent } from './pages/checks/checks.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { VentasComponent } from './pages/ventas/ventas.component';
import { TeamComponent } from './pages/team/team.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CheckComponent } from './components/check/check.component';
import { CorredorComponent } from './components/corredor/corredor.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatsComponent } from './pages/stats/stats.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    ProductosComponent,
    VentasComponent,
    ChecksComponent,
    LayoutAdminComponent,
    TeamComponent,
    ProductoComponent,
    CheckComponent,
    CorredorComponent,
    StatsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    NgApexchartsModule
  ],
  exports:[
    LayoutAdminComponent
  ]
})
export class AdminModule { }
