import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Registro } from '../interfaces/registro.interface';
import { Login } from '../interfaces/login.interface';
import { tap } from 'rxjs';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  almacenarLocalStorage(token: string){
    localStorage.setItem('token', token);
  }

  registrarUsuario( data: Registro ){
    return this.http.post(`${url_base}/usuarios`, data)
    .pipe(
      tap( (resp:any) => {
        this.almacenarLocalStorage(resp.token);
      } )
    );
  }

  login( data: Login ){
    return this.http.post(`${url_base}/auth/login`, data)
      .pipe(
        tap( (resp:any) => {
          this.almacenarLocalStorage(resp.token);
        } )
      );
  }

  logout(){
    localStorage.removeItem('token');
  }

}
