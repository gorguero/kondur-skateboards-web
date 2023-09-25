import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public menuList: any[] = [];
  public userLogged:any;
  
  constructor(private usuarioService:UsuarioService, private router:Router, public menuService:MenuService){}

  ngOnInit(): void {
    this.menuList = this.menuService.cargarMenu();
  }

  logout(){
    this.usuarioService.logout();
    window.location.replace('/sesion/Login');
  }

}
