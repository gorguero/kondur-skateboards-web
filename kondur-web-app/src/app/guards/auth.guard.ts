import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService:UsuarioService, private router:Router) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.usuarioService.renovarToken()
        .pipe(
          tap( isLogged => {
            if(!isLogged){
              this.router.navigate(['/sesion/Login']);
              console.log('Informacion desde el guard')
              console.log(isLogged)
            }
            console.log('Informacion desde el guard')
            console.log(isLogged)
          } )
        )
  }
  
}
