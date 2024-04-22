import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Venta } from '../models/venta.model';

@Injectable({
    providedIn: 'root'
})

export class PaymentService {
    private url = 'http://localhost:5000/api/payment/';  // Cambia la URL según tu configuración
  
    constructor(private http: HttpClient) { }
  
    createOrder(): Observable<any> {
      return this.http.get(this.url);  // Cambia a una solicitud POST si es necesario
    }
    createVenta(venta: Venta): Observable<any>{
      return this.http.post(this.url, venta);
    }

    handleSuccess(): Observable<any> {
        const successUrl = `${this.url}/success`;
        return this.http.get(successUrl);
      }
  }