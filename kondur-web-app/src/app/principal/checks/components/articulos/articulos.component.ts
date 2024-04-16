import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Check } from 'src/app/models/checks.model';
import { CheckService } from 'src/app/services/check.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  listChecks: Check[]=[];
  desde: number = 0;


  constructor(
    private _checkService: CheckService,
    private _sanitizer: DomSanitizer
  ) {
   }

  ngOnInit(): void {
    this.obtenerChecks();
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }
  
  // getSafeVideoUrl(url: string): SafeResourceUrl {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  // }
  getVideoIframe(url: string) {
    var video, results;
 
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
}


  // Función para extraer el ID del video de YouTube desde la URL
  // extractYouTubeVideoId(url:string) {
  //   // Expresión regular para buscar el ID del video en la URL
  //   const regExp = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;
  //   // Ejecutar la expresión regular en la URL
  //   const match = url.match(regExp);
  //   // Si hay una coincidencia, devuelve el ID del video, de lo contrario, devuelve null
  //   return match ? match[1] : '';
  // }

  obtenerChecks(){
    this._checkService.getChecksPaginated(this.desde).subscribe({
      next: ({checks}) => {
        this.listChecks = checks;
      },
      error: (err:any) => {
        console.log(err)
      }
    });
  }

}
