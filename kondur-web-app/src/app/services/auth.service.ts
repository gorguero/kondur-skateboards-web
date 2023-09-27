import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import Usuarios from '../models/usuarios.model';
import { JwtHelperService } from "@auth0/angular-jwt";

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user?:Usuarios;

  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  getDecodedToken(token:any): any | null {
    if (this.token) {
      // Decodificar el JWT y devolverlo como objeto
      const helper = new JwtHelperService();
      let decodedToken = helper.decodeToken(token);
      return decodedToken;
    }
    return null;
  }

  public isAuthenticated( allowRoles: string[] ):boolean{
    
    //Validamos el token
    const token = this.token;

    if(!token){
      return false;
    }

    //Verificación y decodificación del token
    try {
      
      let decodedToken = this.getDecodedToken(token);

      if( !decodedToken ){
        localStorage.removeItem('token');
        return false;
      }

      return allowRoles.includes( decodedToken['rol'] );

    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }

  }

  almacenarLocalStorage(token: string, menu: any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  login( data: Login ):Observable<Usuarios>{
    return this.http.post<Usuarios>(`${url_base}/auth/login`, data)
      .pipe(
        tap( (resp:any) => { this.user = resp } ),
        tap( (resp:any) => { this.almacenarLocalStorage(resp.token, resp.menu); } )
      );
  }

  renovarToken(): Observable<boolean>{
    return this.http.get(`${url_base}/auth/renovartoken`, {
      headers: {
        'x-token': this.token
      }
    }).pipe( 
      map((resp:any) => {
        
       const {nombre, apellido, nickname, email, rol, estado, uid} = resp.usuario;

       this.almacenarLocalStorage(resp.token, resp.menu);
       this.user = new Usuarios(nombre, apellido, nickname, email, '', '', undefined, undefined, rol, estado, uid);
  
        return true;
      }),
      catchError( error => of(false) )
     )
  }

  logout(){
    this.user = undefined;
    localStorage.clear()
  }

}
