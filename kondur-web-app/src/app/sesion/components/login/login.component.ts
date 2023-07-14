import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm: FormGroup = this.fb.group({
    nickname: ['',[Validators.required]],
    password: ['', Validators.required]
  });

  formSubmit:boolean = false;

  constructor(private fb:FormBuilder, private UsuarioService:UsuarioService, private router:Router){}

  login(){
    this.formSubmit = true;
  
    if( this.loginForm.invalid ){
      return;
    }
    
    this.router.navigate(['home']);
  }

  campoValido( campo:string ):boolean{
    if( this.loginForm.get(campo)?.invalid && this.formSubmit ){
      return true;
    }else{
      return false; 
    }
  }

}
