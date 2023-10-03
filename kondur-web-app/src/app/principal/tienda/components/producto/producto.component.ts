import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  id: string | null;
  producto: any = {};

  constructor(
    private _productoService: ProductoService,
    private aRouter: ActivatedRoute)
  { this.id = this.aRouter.snapshot.paramMap.get('id');}

  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto(){
    if(this.id !== null){
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        console.log(data);
          this.producto = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

}
