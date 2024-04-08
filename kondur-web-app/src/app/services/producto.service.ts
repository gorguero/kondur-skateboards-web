import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { ProductoIntf } from '../interfaces/producto.interface';
import { CargarProductos } from '../interfaces/cargar-productos.interface';

const url_base = environment.url_base;
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = 'http://localhost:5000/api/productos/';

  constructor(private http: HttpClient) { }

  getProducto(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }
  getProductosPaginados( desde:number = 0 ){
    return this.http.get<CargarProductos>(`${url_base}/productos?desde=${desde}`);
  }

  guardarProducto(data: ProductoIntf) {
    return this.http.post(`${url_base}/productos`, data);
  }

  obtenerProducto(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}${id}`);
  }

  editarProducto(id: string, data: Producto): Observable<any> {
    return this.http.put(this.url + id, data);
  }

  deshabilitarProducto(id: string): Observable<any> {
    return this.http.delete(`${this.url}${id}`);
  }
}
