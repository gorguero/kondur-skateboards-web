import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header/header.component';
import { MenuComponent } from './header/navbar/menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { CarritoComponent } from './header/carrito/carrito.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    CarritoComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
