import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutHomeComponent } from './home/layout-home/layout-home.component';
import { LayoutChecksComponent } from './checks/layout-checks/layout-checks.component';
import { LayoutNosotrosComponent } from './nosotros/layout-nosotros/layout-nosotros.component';
import { LayoutTiendaComponent } from './tienda/layout-tienda/layout-tienda.component';
import { LandingComponent } from './home/components/landing/landing.component';
import { TablasPageComponent } from './tienda/pages/tablas-page/tablas-page.component';

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
            {path:'**', redirectTo:'home'},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrincipalRoutingModule{}