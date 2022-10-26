import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './navbar/menu/menu.component';
import { LoginComponent } from './navbar/login/login.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
