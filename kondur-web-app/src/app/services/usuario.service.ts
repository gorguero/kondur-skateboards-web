import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Registro } from '../interfaces/registro.interface';
import { Login } from '../interfaces/login.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Usuarios } from '../models/usuarios.model';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: any;

  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  almacenarLocalStorage(token: string, menu: any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  registrarUsuario( data: Registro ){
    return this.http.post(`${url_base}/usuarios`, data)
    .pipe(
      tap( (resp:any) => {
        this.almacenarLocalStorage(resp.token, resp.menu);
      } )
    );
  }

  login( data: Login ){
    return this.http.post(`${url_base}/auth/login`, data)
      .pipe(
        tap( (resp:any) => {
          this.almacenarLocalStorage(resp.token, resp.menu);
        } )
      );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
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
       this.usuario = new Usuarios(nombre, apellido, nickname, email, '', '', undefined, undefined, rol, estado, uid);
       console.log(this.usuario)
  
        return true;
      }),
      catchError( error => of(false) )
     )
  }

}
