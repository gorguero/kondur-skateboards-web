import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SesionRoutingModule } from './sesion-routing.module';
import { LayoutSesionComponent } from './layout-sesion/layout-sesion.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PerfilComponent,
    LayoutSesionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatExpansionModule,
    RouterModule,
    SesionRoutingModule
  ],
  exports: [
    LayoutSesionComponent
  ]
})
export class SesionModule { }
