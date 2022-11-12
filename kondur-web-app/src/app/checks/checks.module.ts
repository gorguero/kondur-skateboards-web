import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecksPrincipalComponent } from './components/checks-principal/checks-principal.component';
import { SharedModule } from '../shared/shared.module';
import { ArticulosComponent } from './Pages/articulos/articulos.component';




@NgModule({
  declarations: [
    ChecksPrincipalComponent,
    ArticulosComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    ChecksPrincipalComponent
  ]
})
export class ChecksModule { }
