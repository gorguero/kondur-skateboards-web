import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interfaces';
import { Login } from '../interfaces/login.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import Usuarios from '../models/usuarios.model';


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

  // getDecodedToken(): any | null {
  //   if (this.token) {
  //     // Decodificar el JWT y devolverlo como objeto
  //     const tokenParts = this.token.split('.');
  //     if (tokenParts.length === 3) {
  //       const payload = JSON.parse(atob(tokenParts[1]));
  //       return payload;
  //     }
  //   }
  //   return null;
  // }

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
       console.log(this.user)
  
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
