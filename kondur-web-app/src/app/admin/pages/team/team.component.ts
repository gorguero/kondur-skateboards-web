import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  listTeam: Team[]=[];

  constructor(private fb: FormBuilder,
              private _teamService: TeamService,
              private toastr: ToastrService,
  ){}
  ngOnInit(): void {
    this.obtenerTeam();
    
  }

  public teamForm: FormGroup = this.fb.group({
    nombre_rider:['',Validators.required],
    biografia:['',Validators.required],
    url_imagen:['',Validators.required],
    instagram:['',Validators.required],
    facebook:['']
  })

  obtenerTeam(){
    this._teamService.getTeam().subscribe(data =>{
      this.listTeam = data;
    }, error =>{
      console.log(error);
    })
  }

  agregarCorredor(){
    console.log(this.teamForm);
    console.log(this.teamForm.get('team')?.value);

    const CORREDOR: Team ={
      nombre_rider: this.teamForm.get('nombre_rider')?.value,
      biografia: this.teamForm.get('biografia')?.value,
      url_imagen: this.teamForm.get('url_imagen')?.value,
      instagram: this.teamForm.get('instagram')?.value,
      facebook: this.teamForm.get('facebook')?.value
    }
    console.log(CORREDOR);
    this._teamService.guardarCorredor(CORREDOR).subscribe(data =>{
      this.toastr.success('Se agrego un corredor exitosamente!', 'Corredor agregado');
      window.location.reload();
    }, error => {
      console.log(error);
      this.teamForm.reset();}
    )
  }
  //resetea el formulario al apretar cancelar
  resetearFormulario() {
    this.teamForm.reset();
  }

  eliminarCorredor(id: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este corredor?')) {
      this._teamService.deshabilitarCorredor(id).subscribe(
        () => {
          this.toastr.success('El corredor se eliminó exitosamente', 'Corredor eliminado');
          this.obtenerTeam(); // Actualiza la lista después de eliminar
        },error => {
          console.log(error);
          this.toastr.error('Hubo un error al eliminar el corredor', 'Error');
        }
      );
    }
  }

}
