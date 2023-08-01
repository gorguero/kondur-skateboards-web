import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChecksComponent } from "./pages/checks/checks.component";
import { ProductosComponent } from "./pages/productos/productos.component";
import { VentasComponent } from "./pages/ventas/ventas.component";
import { TeamComponent } from "./pages/team/team.component";
import { LayoutAdminComponent } from "./layout-admin/layout-admin.component";
import { ProductoComponent } from "./components/producto/producto.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutAdminComponent,
        children: [
            {path:'productos', component: ProductosComponent},
            {path:'productos/:id', component: ProductoComponent},
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