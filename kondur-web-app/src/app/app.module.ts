import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TiendaModule } from './tienda/tienda.module';
import { ChecksModule } from './checks/checks.module';
import { NosotrosModule } from './nosotros/nosotros.module';
import { SignupModule } from './signup/signup.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { CarritoModule } from './carrito/carrito.module';
import { UsuarioModule } from './usuario/usuario.module';
import { SigninModule } from './signin/signin.module';
import { HomeModule } from './principal/home/home.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    TiendaModule,
    ChecksModule,
    NosotrosModule,
    SignupModule,
    SigninModule,
    AdminModule,
    BrowserAnimationsModule,
    CarritoModule,
    BrowserAnimationsModule,
    UsuarioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
