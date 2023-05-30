import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TiendaModule } from './tienda/tienda.module';
import { ChecksModule } from './checks/checks.module';
import { SignupModule } from './signup/signup.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { UsuarioModule } from './usuario/usuario.module';
import { SigninModule } from './signin/signin.module';
import { HomeModule } from './principal/home/home.module';
import { NosotrosModule } from './principal/nosotros/nosotros.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    NosotrosModule,
    TiendaModule,
    ChecksModule,
    SignupModule,
    SigninModule,
    AdminModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    UsuarioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
