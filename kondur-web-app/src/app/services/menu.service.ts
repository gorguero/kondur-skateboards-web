import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public menu: any = [];

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu') ?? '') || [];
    return this.menu;
  }
  
}
