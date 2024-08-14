import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  // ESPACIO PARA VALIDACION DE FORMULARIO DE REGISTRO
  public registroForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    nickname: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    repPassword: ['', [Validators.required, Validators.minLength(8)]],
    nro_contacto: ['', [Validators.required]],
    direcciones: this.fb.group({
      provincia: [''],
      ciudad: [''],
      calle1: [''],
      calle2: [''],
      altura: [''],
      codPostal: [''],
    }),
    terminos: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder, 
    private usuarioService: UsuarioService, 
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registroForm.reset();
  }

  registrarUsuario():void{

    if( this.registroForm.invalid ) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.usuarioService.registrarUsuario( this.registroForm.value )
      .subscribe(
        {
          next: resp => {
            this.toastr.success('Gracias por registrarte', `¡Usuario registrado correctamente!`);

            setTimeout(() => {
              this.router.navigate(['/sesion/Login']);
            }, 1000);

          },
          error: err => {
            console.warn(err);
            const errorEmailExist = err.error.errors.email;
            const errorNicknameExist = err.error.errors.nickname;
            const errorNroContactExist = err.error.errors.nro_contacto;

            if( errorEmailExist && errorNicknameExist ){
              this.toastr.error(`El email: ${errorEmailExist.value} y el username ${errorNicknameExist.value} ya están registrados`, 'Campos ya existentes');
            }else{
              if( errorEmailExist ){
                this.toastr.error(`${errorEmailExist.msg}`, 'Error');
              }
              if( errorNicknameExist ){
                this.toastr.error(`${errorNicknameExist.msg}`, 'Error');
              }
            }

            if( errorNroContactExist ){
              this.toastr.error(`${errorNroContactExist.msg}`, 'Error');
            }

          }
        }
    );
  
    this.registroForm.reset();
  }
  
  /* VALIDACIONES Y MENSAJES DE RESPUESTA */
  isValidField( field:string ):boolean | null{
    return this.registroForm.controls[field].errors && this.registroForm.controls[field].touched;
  }
  
  getFieldError( field:string ):string | null{
    
    if( !this.registroForm.controls[field] ) return null;
    
    const errors = this.registroForm.controls[field].errors || {};
    
    for (const key of Object.keys(errors)) {
      
      switch(key){
        case 'required':
          return 'Este campo es requerido*';
        
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} carácteres*`;

        case 'pattern':
          return 'Solo se permite el ingreso de letras'
      }

    }

    return null;
  }
  /* FIN VALIDACIONES Y MENSAJES DE RESPUESTA */

}
