import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingModule } from './landing/landing.module';
import { TiendaModule } from './tienda/tienda.module';
import { ChecksModule } from './checks/checks.module';
import { NosotrosModule } from './nosotros/nosotros.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LandingModule,
    TiendaModule,
    ChecksModule,
    NosotrosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
