import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header/header.component';
import { MenuComponent } from './header/navbar/menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { CarritoComponent } from './header/carrito/carrito.component';
import { ToastrModule } from 'ngx-toastr';
import { FactuacionComponent } from './header/carrito/pages/factuacion/factuacion.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    CarritoComponent,
    FooterComponent,
    FactuacionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot(),
    MatExpansionModule,
    ReactiveFormsModule,
  ],
  exports: [HeaderComponent, FooterComponent, ToastrModule],
})
export class SharedModule {}
