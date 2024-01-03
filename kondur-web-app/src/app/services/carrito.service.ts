import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const url_base = environment.url_base;
@Injectable({
  providedIn: 'root'
})

export class CarritoSerivice{
    private url = 'http://localhost:5000/api/carrito/';

    constructor(private http: HttpClient) { }

    guardarProducto(data:any) {
        return this.http.post(`${url_base}/agregar_carrito`, data);
    }
    

}