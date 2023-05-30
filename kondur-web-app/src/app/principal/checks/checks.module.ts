import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { LayoutChecksComponent } from './components/layout-checks/layout-checks.component';




@NgModule({
  declarations: [
    LayoutChecksComponent,
    ArticulosComponent,
    LayoutChecksComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    LayoutChecksComponent
  ]
})
export class ChecksModule { }
