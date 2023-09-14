import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Check } from 'src/app/models/checks.model';
import { CheckService } from 'src/app/services/check.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent {
  id: string | null;
  check: any = {};

  constructor(private fb: FormBuilder,
    private _checkService: CheckService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private router: Router,
    private _sanitizer: DomSanitizer){
  this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    this.obtenerCheck();
  }

  public checkForm: FormGroup = this.fb.group({
    titulo: ['',Validators.required],
    descripcion: ['',Validators.required],
    ig_filmer: ['',Validators.required],
    ig_rider: ['',Validators.required],
    img_rider: ['',Validators.required],
    url_video: ['',Validators.required]
  });

  obtenerCheck(){
    if(this.id !== null){
      this._checkService.obtenerCheck(this.id).subscribe(data => {
        console.log(data);
          this.check = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  esEditar(){
    if(this.id !== null){
      this._checkService.obtenerCheck(this.id).subscribe(data =>{
        this.checkForm.setValue({
          titulo: data.titulo,
          descripcion: data.descripcion,
          ig_filmer: data.ig_filmer,
          ig_rider: data.ig_rider,
          img_rider: data.img_rider,
          url_video:data.url_video
        })
      })
    }
  }

  editarCheck(){
    const CHECK: Check ={
      titulo: this.checkForm.get('titulo')?.value,
      descripcion: this.checkForm.get('descripcion')?.value,
      ig_filmer: this.checkForm.get('ig_filmer')?.value,
      ig_rider: this.checkForm.get('ig_rider')?.value,
      img_rider: this.checkForm.get('img_rider')?.value,
      url_video: this.checkForm.get('url_video')?.value
    }
    if(this.id !== null){
      console.log(CHECK);
      this._checkService.editarCheck(this.id, CHECK).subscribe(data =>{
      this.toastr.info('Se actualizo el check exitosamente!', 'Check actualizado');
      window.location.reload();
      }, error => {
        console.log(error);
        this.checkForm.reset();}
      )
    }
  }

  getVideoIframe(url: string) {
    var video, results;

    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  }

  deshabilitarCheck(){
    if (this.id !== null){
      this._checkService.deshabilitarCheck(this.id).subscribe(
        ()=>{
          this.toastr.error('El check ha sido eliminado.', 'Check Deshabilitado');
          this.router.navigate(['/administrador/checks']).then(() => {
            window.location.reload();
        });
        },(error) => {
          console.error(error);
        }
      );
    }
  } 
}
