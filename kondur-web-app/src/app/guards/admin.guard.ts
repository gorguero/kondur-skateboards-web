import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

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
          }
          console.log('Informacion desde el guard')
          console.log(isLogged)
        } )
      )
  }
  
}
