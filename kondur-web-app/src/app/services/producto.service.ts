import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url ='http://localhost:5000/api/productos/';

  constructor(private http: HttpClient) { }

  getProducto(): Observable<any>{
    return this.http.get(this.url);
  }
  guardarProducto(producto: Producto): Observable<any>{
    return this.http.post(this.url, producto);
  }

  obtenerProducto(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }
}
