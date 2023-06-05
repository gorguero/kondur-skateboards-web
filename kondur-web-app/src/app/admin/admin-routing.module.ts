import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChecksComponent } from "./components/checks/checks.component";
import { ProductosComponent } from "./components/productos/productos.component";
import { FacturasComponent } from "./components/facturas/facturas.component";

const routes: Routes = [
    {
        path: '',
        component: ProductosComponent,
        children: [
            {path:'productos', component: ProductosComponent},
            {path:'checks', component: ChecksComponent},
            {path:'facturas', component: FacturasComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule{}