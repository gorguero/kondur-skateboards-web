import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ItemCarrito } from 'src/app/models/itemCarrito.model';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-indumentaria-page',
  templateUrl: './indumentaria-page.component.html',
  styleUrls: ['./indumentaria-page.component.css']
})
export class IndumentariaPageComponent {

  indumentariaList:Producto[] = [];
  constructor(private _productoService:ProductoService,  private toastr: ToastrService){}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this._productoService.getProducto().subscribe( data =>{

      /* Filtramos por indumentaria */
      this.indumentariaList = data.filter( (item: { categoria: string; }) => item.categoria === 'indumentaria' );

    }, error =>{
      console.log(error);
    })
  }
}
