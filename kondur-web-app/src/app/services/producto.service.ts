import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url ='http://localhost:5000/api/productos/';

  constructor(private http: HttpClient) { }

  getProducto(): Observable<any>{
    return this.http.get(this.url);
  }
}
