import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta.model';

const url_base = environment.url_base;
@Injectable({
  providedIn: 'root'
})
export class VentaServices{
    private url = 'http://localhost:5000/api/ventas/';

    constructor(private http: HttpClient) { }

    createVenta(venta: Venta): Observable<any>{
      return this.http.post(this.url, venta);
    }
}