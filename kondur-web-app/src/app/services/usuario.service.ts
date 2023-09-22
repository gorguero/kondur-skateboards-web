import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Registro } from '../interfaces/registro.interface';
import { Login } from '../interfaces/login.interface';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  registrarUsuario( data: Registro ){
    return this.http.post(`${url_base}/usuarios`, data);
  }

  login( data: Login ){
    return this.http.post(`${url_base}/auth/login`, data);
  }

}
