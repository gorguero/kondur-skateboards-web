import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutHomeComponent } from './home/layout-home/layout-home.component';
import { LayoutChecksComponent } from './checks/layout-checks/layout-checks.component';
import { LayoutNosotrosComponent } from './nosotros/layout-nosotros/layout-nosotros.component';
import { LayoutTiendaComponent } from './tienda/layout-tienda/layout-tienda.component';
import { LandingComponent } from './home/components/landing/landing.component';
import { TablasPageComponent } from './tienda/pages/tablas-page/tablas-page.component';
import { IndumentariaPageComponent } from './tienda/pages/indumentaria-page/indumentaria-page.component';
import { LijasPageComponent } from './tienda/pages/lijas-page/lijas-page.component';
import { ProductoComponent } from './tienda/components/producto/producto.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutHomeComponent,
        children: [
            {path:'home', component: LandingComponent},
            {path:'checks', component: LayoutChecksComponent},
            {path:'nosotros', component: LayoutNosotrosComponent},
            {path:'tienda', component: LayoutTiendaComponent},
            {path:'tienda/tablas', component: TablasPageComponent},
            {path:'tienda/indumentaria', component: IndumentariaPageComponent},
            {path:'tienda/lijas', component: LijasPageComponent},
            {path:'tienda/:id', component: ProductoComponent},
            {path:'**', redirectTo:'home'},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrincipalRoutingModule{}