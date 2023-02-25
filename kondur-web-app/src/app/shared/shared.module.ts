import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './navbar/menu/menu.component';
import { LoginComponent } from './navbar/login/login.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    LoginComponent,
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
