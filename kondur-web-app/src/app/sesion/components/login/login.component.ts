import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

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

  public userLogged:any;

  formSubmit:boolean = false;

  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router, private toastr: ToastrService){}

  login(){
    this.formSubmit = true;
  
    if( this.loginForm.invalid ){
      return;
    }
    
    this.auth.login( this.loginForm.value )
      .subscribe(
        {
          next: resp => {
            // console.log(resp);
            this.toastr.success('Nos alegrá mucho que estes por aquí', `¡Bienvenido!`);
  
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 1000);
  
          },
          error: err => {
            console.log(err)
            const errorNicknameExist = err.error.msg;
            const errorPasswordExist = err.error.msg;
  
            if( errorNicknameExist || errorPasswordExist ){
              this.toastr.error(`Usuario y/o contraseña incorrectos`, 'Error');
            }
        
          }
        }
    );
  }

  campoValido( campo:string ):boolean{
    if( this.loginForm.get(campo)?.invalid && this.formSubmit ){
      return true;
    }else{
      return false; 
    }
  }

}
