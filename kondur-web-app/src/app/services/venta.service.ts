import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta.model';
import { VentasServiceResp } from '../interfaces/cargar-ventas.interface';

const url_base = environment.url_base;
@Injectable({
  providedIn: 'root'
})
export class VentaServices{
    private url = 'http://localhost:5000/api/ventas';

    constructor(private http: HttpClient) { }

    createVenta(venta: Venta): Observable<any>{
      return this.http.post(this.url, venta);
    }

    getVentasPaginadas(desde: number, nombreCliente?: string, fechaInicio?: string, fechaFin?: string): Observable<VentasServiceResp> {
      let params = new HttpParams().set('desde', desde.toString());
  
      if (nombreCliente) {
        params = params.set('nombreCliente', nombreCliente);
      }
  
      if (fechaInicio && fechaFin) {
        params = params.set('fechaInicio', fechaInicio).set('fechaFin', fechaFin);
      }
  
      return this.http.get<VentasServiceResp>(`${this.url}`, { params });
    }
  

    // getVentasPaginadas( desde:number = 0 ){
    //   return this.http.get<VentasServiceResp>(`${this.url}?desde=${desde}`);
    // }

    getVentasByUserId(id: string): Observable<any> {
      return this.http.get<any>(`${this.url}/usuario/${id}`);
    }

    getVentaById(id:string): Observable<any>{
      return this.http.get<any>(`${this.url}/detalle/${id}`)
    }

    generatePDF(ventaId: string): Observable<Blob> {
      return this.http.get(`${this.url}/generate-pdf/${ventaId}`, { responseType: 'blob' });
    }

}