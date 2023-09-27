import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interfaces';
import Usuarios from 'src/app/models/usuarios.model';
import { AuthService } from 'src/app/services/auth.service';
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
  public token:any = '';
  
  constructor(private auth:AuthService, private router:Router, public menuService:MenuService){
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.menuList = this.menuService.cargarMenu();
    this.userLogged = this.auth.getDecodedToken( this.token );
  }

  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/sesion/login');
  }

}
