import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Check } from "../models/checks.model";
import { environment } from "src/environments/environment";

const url_base = environment.url_base;

@Injectable({
    providedIn: 'root'
  })

export class CheckService{
    private url ='http://localhost:5000/api/checks/';

    constructor(private http: HttpClient) { }

    getChecksPaginated( desde:number = 0 ): Observable<any>{
        return this.http.get(`${url_base}/checks?desde=${desde}`);
    }
    
    //trae un solo check
    obtenerCheck(id: string): Observable<any>{
        return this.http.get(this.url + id);
    }

    guardarCheck(check: Check): Observable<any>{
        return this.http.post(this.url, check);
    }

    editarCheck(id: string, check: Check): Observable<any>{
        return this.http.put(this.url + id, check);
    }

    deshabilitarCheck(id: string): Observable<any>{
        return this.http.delete(this.url + id);
    }
}