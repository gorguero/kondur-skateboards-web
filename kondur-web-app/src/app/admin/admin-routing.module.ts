import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChecksComponent } from "./components/checks/checks.component";
import { ProductosComponent } from "./components/productos/productos.component";
import { VentasComponent } from "./components/ventas/ventas.component";
import { TeamComponent } from "./components/team/team.component";
import { LayoutAdminComponent } from "./layout-admin/layout-admin.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutAdminComponent,
        children: [
            {path:'productos', component: ProductosComponent},
            {path:'checks', component: ChecksComponent},
            {path:'ventas', component: VentasComponent},
            {path:'team', component: TeamComponent},
            {path:'**', redirectTo:'productos'},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule{}