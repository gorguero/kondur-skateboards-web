import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NosotrosPrincipalComponent } from './components/nosotros-principal/nosotros-principal.component';
import { SharedModule } from '../shared/shared.module';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { CorredoresComponent } from './pages/corredores/corredores.component';



@NgModule({
  declarations: [
    NosotrosPrincipalComponent,
    NosotrosComponent,
    CorredoresComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class NosotrosModule { }
