import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Team } from "../models/team.model";


@Injectable({
    providedIn: 'root'
})
export class TeamService{
    url ='http://localhost:5000/api/team/';

    constructor(private http: HttpClient) { }

    getTeam(): Observable<any>{
        return this.http.get(this.url);
      }
    guardarCorredor(corredor: Team): Observable<any>{
    return this.http.post(this.url, corredor);
    }
    obtenerCorredor(id: string): Observable<any>{
    return this.http.get(this.url + id);
    }
    editarCorredor(id: string, team: Team): Observable<any>{
    return this.http.put(this.url + id, team);
    }
    deshabilitarCorredor(id: string): Observable<any>{
    return this.http.delete(this.url + id);
    }

}