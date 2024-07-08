import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { PrincipalModule } from './principal/principal.module';
import { SesionModule } from './sesion/sesion.module';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrincipalModule, //Principal
    SesionModule,
    AdminModule,
    SharedModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgApexchartsModule

    
  ],
  providers: [provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent]
})
export class AppModule { }
