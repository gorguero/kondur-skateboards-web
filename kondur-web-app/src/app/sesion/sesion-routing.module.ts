import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { PerfilComponent } from "./components/perfil/perfil.component";
import { LayoutSesionComponent } from "./layout-sesion/layout-sesion.component";
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: LayoutSesionComponent,
        children: [
            {path:'Login', component: LoginComponent},
            {path:'Register', component: RegisterComponent},
            {path:'MiPerfil', component: PerfilComponent, canActivate:[AuthGuard]},
            {path:'**', redirectTo:'Login'},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SesionRoutingModule{}