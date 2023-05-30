import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatExpansionModule
  ],
  exports:[
    PerfilComponent
  ]
})
export class UsuarioModule { }
