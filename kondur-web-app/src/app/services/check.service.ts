import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Check } from "../models/checks.model";


@Injectable({
    providedIn: 'root'
  })

export class CheckService{
    url ='http://localhost:5000/api/checks/';

    constructor(private http: HttpClient) { }

    getCheck(): Observable<any>{
        return this.http.get(this.url);
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