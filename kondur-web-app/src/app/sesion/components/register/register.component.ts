import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // ESPACIO PARA VALIDACION DE FORMULARIO DE REGISTRO
  public registroForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    nickname: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    repPassword: ['', [Validators.required, Validators.minLength(8)]],
    calle1: [''],
    calle2: [''],
    altura: [''],
    codPostal: [''],
    terminos: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
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
      }

    }

    return null;
  }
  /* FIN VALIDACIONES Y MENSAJES DE RESPUESTA */

  registrarUsuario():void{
    
    if( this.registroForm.invalid ) {
      this.registroForm.markAllAsTouched();
      return;
    }

    console.log(this.registroForm.value);

    this.usuarioService.registrarUsuario( this.registroForm.value )
      .subscribe( resp => {
        console.log(resp);
      })

    this.registroForm.reset();

  }
}
