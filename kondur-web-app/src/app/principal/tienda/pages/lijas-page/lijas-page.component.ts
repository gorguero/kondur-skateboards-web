import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CargarProductos } from 'src/app/interfaces/cargar-productos.interface';
import { ItemCarrito } from 'src/app/models/itemCarrito.model';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-lijas-page',
  templateUrl: './lijas-page.component.html',
  styleUrls: ['./lijas-page.component.css']
})
export class LijasPageComponent {

  lijasList:Producto[] = [];
  constructor(private _productoService:ProductoService,  private toastr: ToastrService){}

  ngOnInit(): void {
    this.obtenerProductos();
  }
  
  obtenerProductos(){
    this._productoService.getProductosPaginados().subscribe({
      next: ({productos, totalProductos}:CargarProductos) => {
        /* Filtramos por lijas */
        this.lijasList = productos.filter( (item: { categoria: string; }) => item.categoria === 'lijas' );
      }
    })
  }
}
