import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService, private router:Router) {}

  canActivate():any{

    if( !this.auth.isAuthenticated(['ADMIN_ROLE']) ){
      this.router.navigateByUrl('/sesion/login');
      return false;
    }
    
    return true;
  }
  
}
