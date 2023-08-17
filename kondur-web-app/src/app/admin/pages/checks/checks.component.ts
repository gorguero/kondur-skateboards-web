import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Check } from 'src/app/models/checks.model';
import { ToastrService } from 'ngx-toastr';
import { CheckService } from 'src/app/services/check.service';

@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent {
  listChecks: Check[]=[];

  constructor(private fb: FormBuilder,
              private _checkService: CheckService,
              private toastr: ToastrService,
  ){}

  public checkForm: FormGroup = this.fb.group({
    titulo: ['',Validators.required],
    descripcion: ['',Validators.required],
    ig_filmer: ['',Validators.required],
    ig_rider: ['',Validators.required],
    img_rider: ['',Validators.required],
    url_video: ['',Validators.required],
  });
  
  ngOnInit(): void {
    this.obtenerChecks();
    
  }

  obtenerChecks(){
    this._checkService.getCheck().subscribe(data =>{
      console.log(data);
      this.listChecks = data;
    }, error =>{
      console.log(error);
    })
  }

  agregarCheck(){
    console.log(this.checkForm + 'es comdasdbasda');
    console.log(this.checkForm.get('check')?.value);

    const CHECK: Check ={
      titulo: this.checkForm.get('titulo')?.value,
      descripcion: this.checkForm.get('descripcion')?.value,
      ig_filmer: this.checkForm.get('ig_filmer')?.value,
      ig_rider: this.checkForm.get('ig_rider')?.value,
      img_rider: this.checkForm.get('img_rider')?.value,
      url_video: this.checkForm.get('url_video')?.value
    }
    console.log(CHECK);
    this._checkService.guardarCheck(CHECK).subscribe(data=>{
      this.toastr.success('Se agrego un check exitosamente!', 'Check agregado');
      window.location.reload();
    }, error => {
      console.log(error);
      this.checkForm.reset();
    })

  }
  //resetea el formulario al apretar cancelar
  resetearFormulario() {
    this.checkForm.reset();
  }

  eliminarCheck(id: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este video?')) {
      this._checkService.deshabilitarCheck(id).subscribe(
        () => {
          this.toastr.success('El corredor se eliminó exitosamente', 'Corredor eliminado');
          this.obtenerChecks(); // Actualiza la lista después de eliminar
        },error => {
          console.log(error);
          this.toastr.error('Hubo un error al eliminar el corredor', 'Error');
        }
      );
    }
  }

}