import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-corredor',
  templateUrl: './corredor.component.html',
  styleUrls: ['./corredor.component.css']
})
export class CorredorComponent {
  id: string | null;
  corredor: any = {}; // Inicializa corredor como un objeto vacío
  ngOnInit(): void {
    this.esEditar();
    this.obtenerCorredor();
  }

  constructor(private fb: FormBuilder,
              private _teamService: TeamService,
              private toastr: ToastrService,
              private aRouter: ActivatedRoute,
              private router: Router,
              private _sanitizer: DomSanitizer){
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  public corredorForm: FormGroup = this.fb.group({
    nombre_rider: ['', Validators.required],
    biografia: ['', Validators.required],
    url_imagen: ['', Validators.required],
    instagram: ['', Validators.required],
    facebook: ['', Validators.required]
  });

  obtenerCorredor(){
    if(this.id !== null){
      this._teamService.obtenerCorredor(this.id).subscribe(data => {
        console.log(data);
          this.corredor = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  

  esEditar(){
    if(this.id !== null){
      this._teamService.obtenerCorredor(this.id).subscribe(data =>{
        this.corredorForm.setValue({
          nombre_rider: data.nombre_rider,
          biografia: data.biografia,
          url_imagen: data.url_imagen,
          instagram: data.instagram,
          facebook: data.facebook
        })
      })
    }
  }

  editarCorredor(){
    const CORREDOR: Team ={
      nombre_rider: this.corredorForm.get('nombre_rider')?.value,
      biografia: this.corredorForm.get('biografia')?.value,
      url_imagen: this.corredorForm.get('url_imagen')?.value,
      instagram: this.corredorForm.get('instagram')?.value,
      facebook: this.corredorForm.get('facebook')?.value
    }
    if(this.id !== null){
      console.log(CORREDOR);
      this._teamService.editarCorredor(this.id, CORREDOR).subscribe(
        {
          next: data =>{
            this.toastr.info('Se actualizo el corredor exitosamente!', 'Corredor actualizado');
            window.location.reload();
          }, 
           error: err => {
            console.log(err);

            const errorBiografiaExist = err.error.errors.biografia;
            const errorInstagramExist = err.error.errors.instagram;
            const errorNombreRiderExist = err.error.errors.nombre_rider;
            const errorUrlImagenExist = err.error.errors.url_imagen;

            if(errorBiografiaExist){
              this.toastr.error(`${errorBiografiaExist.msg}`, 'Error');
            }
            if(errorInstagramExist){
              this.toastr.error(`${errorInstagramExist.msg}`, 'Error');
            }
            if(errorNombreRiderExist){
              this.toastr.error(`${errorNombreRiderExist.msg}`, 'Error');
            }
            if(errorUrlImagenExist){
              this.toastr.error(`${errorUrlImagenExist.msg}`, 'Error');
            }

            this.corredorForm.reset();
          } 
        }
      )
    }
  }

  deshabilitarCorredor(){
    if (this.id !== null){
      this._teamService.deshabilitarCorredor(this.id).subscribe(
        ()=>{
          this.toastr.error('El corredor ha sido eliminado.', 'Corredor Deshabilitado');
          this.router.navigate(['/administrador/team']).then(() => {
            window.location.reload();
        });
        
        },(error) => {
          console.error(error);
        }
      );
    }
  } 

}
