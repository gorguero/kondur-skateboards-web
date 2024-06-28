import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })
  export class StatsService {
  
    private baseUrl = environment.url_base;;
  
    constructor(private http: HttpClient) { }
  
    getTotalProductosPorCategoria(): Observable<any> {
      return this.http.get(`${this.baseUrl}/stats/productos-por-categoria`);
    }
  
    getTotalVentas(): Observable<any> {
      return this.http.get(`${this.baseUrl}/stats/total-ventas`);
    }
  
    getVentasPorMes(): Observable<any> {
      return this.http.get(`${this.baseUrl}/stats/ventas-por-mes`);
    }
  
    getIngresosTotales(): Observable<any> {
      return this.http.get(`${this.baseUrl}/stats/ingresos-totales`);
    }
  
    getProductosMasVendidos(): Observable<any> {
      return this.http.get(`${this.baseUrl}/stats/productos-mas-vendidos`);
    }
  }