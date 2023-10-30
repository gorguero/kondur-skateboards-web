import { Component, OnInit } from '@angular/core';
import Usuarios from 'src/app/models/usuarios.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public tokenDecoded = localStorage.getItem('token');
  private token: any = '';
  public usuarioActual?: any = {};
  public usuarioDirecciones?: any = [];

  constructor(private auth: AuthService, private usuarioService: UsuarioService) {
    this.token = this.auth.getDecodedToken(this.tokenDecoded);
    
  }

  ngOnInit(): void {
    this.usuarioService.obtenerUsuario(this.token.id)
      .subscribe(data => {
        let resp:any = data;
        this.usuarioActual = resp.userById;
        this.usuarioDirecciones = this.usuarioActual.direcciones;
        console.log(this.usuarioDirecciones[0])
      });
  }

  getToken() {
    return this.token;
  }

}
