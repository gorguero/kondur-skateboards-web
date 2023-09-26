import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService, private router:Router) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.auth.renovarToken()
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
