import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public editUserForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    nickname: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    nro_contacto: [''],
    direcciones: this.fb.group({
      provincia: [''],
      ciudad: [''],
      calle1: [''],
      calle2: [''],
      altura: [''],
      codPostal: [''],
    }),
  });

  constructor(
    private auth: AuthService, 
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
  ) {
    this.token = this.auth.getDecodedToken(this.tokenDecoded);
    
  }

  ngOnInit(): void {
    this.usuarioService.obtenerUsuario(this.token.id)
      .subscribe((data:any) => {
        this.usuarioActual = data.userById;
      });
  }

  updateUser():void{
    console.log(this.editUserForm.value);

    //Obtenemos los campos y valores del formGroup Direcciones
    const direccionesGroup = this.editUserForm.get('direcciones') as FormGroup;
    const provinciaControl = direccionesGroup.get('provincia');
    const ciudadControl = direccionesGroup.get('ciudad'); 
    const calle1Control = direccionesGroup.get('calle1'); 
    const calle2Control = direccionesGroup.get('calle2'); 
    const alturaControl = direccionesGroup.get('altura'); 
    const codPostalControl = direccionesGroup.get('codPostal'); 
    
    const userEdit: Usuarios = {
      nombre: this.editUserForm.get('nombre')?.value,
      apellido: this.editUserForm.get('apellido')?.value,
      nickname: this.editUserForm.get('nickname')?.value,
      email: this.editUserForm.get('email')?.value,
      nro_contacto: this.editUserForm.get('nro_contacto')?.value,
      direcciones: [
        {
          provincia: provinciaControl?.value,
          ciudad: ciudadControl?.value,
          calle1: calle1Control?.value,
          calle2: calle2Control?.value,
          altura: alturaControl?.value,
          codPostal: codPostalControl?.value
        }
      ]
    }
    console.log(this.token.id)
    console.log(userEdit)

    this.usuarioService.updateUsuario(this.token.id, userEdit)
      .subscribe({
        next: resp => {
          console.log(resp)
        },
        error: error => {
          console.log(error)
        }
      })
  }

  getToken() {
    return this.token;
  }

}
