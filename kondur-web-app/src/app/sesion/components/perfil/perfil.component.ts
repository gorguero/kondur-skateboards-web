import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Usuarios from 'src/app/models/usuarios.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';

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
      codpostal: [''],
    }),
  });

  constructor(
    private auth: AuthService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.token = this.auth.getDecodedToken(this.tokenDecoded);

  }

  preCargarForm() {
    
    const userFormEdit: any = {
      nombre: this.usuarioActual.nombre,
      apellido: this.usuarioActual.apellido,
      nickname: this.usuarioActual.nickname,
      email: this.usuarioActual.email,
      nro_contacto: this.usuarioActual.nro_contacto,
      direcciones: {
        provincia: this.usuarioDirecciones[0].provincia,
        ciudad: this.usuarioDirecciones[0].ciudad,
        calle1: this.usuarioDirecciones[0].calle1,
        calle2: this.usuarioDirecciones[0].calle2,
        altura: this.usuarioDirecciones[0].altura,
        codpostal: this.usuarioDirecciones[0].codpostal,
      }
    }

    this.editUserForm.patchValue(userFormEdit);
  }

  ngOnInit(): void {

    this.usuarioService.obtenerUsuario(this.token.id)
      .subscribe((usuario: Usuarios) => {
        this.usuarioActual = usuario;
        this.usuarioDirecciones = this.usuarioActual.direcciones;
        
        this.preCargarForm();
      });

  }

  updateUser(): void {
    console.log(this.editUserForm.value);

    //Obtenemos los campos y valores del formGroup Direcciones
    const direccionesGroup = this.editUserForm.get('direcciones') as FormGroup;
    const provinciaControl = direccionesGroup.get('provincia');
    const ciudadControl = direccionesGroup.get('ciudad');
    const calle1Control = direccionesGroup.get('calle1');
    const calle2Control = direccionesGroup.get('calle2');
    const alturaControl = direccionesGroup.get('altura');
    const codPostalControl = direccionesGroup.get('codpostal');

    const userEdit: Usuarios = {
      nombre: this.editUserForm.get('nombre')?.value,
      apellido: this.editUserForm.get('apellido')?.value,
      nickname: this.editUserForm.get('nickname')?.value,
      email: this.editUserForm.get('email')?.value,
      nro_contacto: this.editUserForm.get('nro_contacto')?.value,
      direcciones: {
        provincia: provinciaControl?.value,
        ciudad: ciudadControl?.value,
        calle1: calle1Control?.value,
        calle2: calle2Control?.value,
        altura: alturaControl?.value,
        codpostal: codPostalControl?.value
      }
    }

    this.usuarioService.updateUsuario(this.token.id, userEdit)
      .subscribe({
        next: resp => {
          this.toastr.success('El perfil se actualizó exitosamente', 'Perfil Actualizado');
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
