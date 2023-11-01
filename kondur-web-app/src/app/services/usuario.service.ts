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

  almacenarLocalStorage(token: string, menu: any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  registrarUsuario( data: Registro ){
    return this.http.post(`${url_base}/usuarios`, data)
    .pipe(
      tap( (resp:any) => {
        
      } )
    );
  }

  obtenerUsuario( data:string ): Observable<Usuarios>{
    return this.http.get<Usuarios>(`${url_base}/usuarios/byid?data=${data}`);
  }

  updateUsuario( id:string, userUpdate:Usuarios ):Observable<Usuarios>{
    return this.http.put<Usuarios>(`${url_base}/usuarios/${id}`, userUpdate);
  }

}
