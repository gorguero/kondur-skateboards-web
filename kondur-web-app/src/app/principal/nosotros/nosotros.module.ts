import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutComponent } from './components/layout/layout.component';
import { CorredoresComponent } from './components/corredores/corredores.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';



@NgModule({
  declarations: [
    LayoutComponent,
    CorredoresComponent,
    NosotrosComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class NosotrosModule { }
