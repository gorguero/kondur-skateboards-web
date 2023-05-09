import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // ESPACIO PARA VALIDACION DE FORMULARIO DE REGISTRO
  registroForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required, Validators.minLength(8)],
      repContrasenia: ['', Validators.required],
      terminos: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  registrarUsuario(){
    console.log(this.registroForm)
  }
}
