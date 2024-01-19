import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ItemCarrito } from 'src/app/models/itemCarrito.model';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-tablas-page',
  templateUrl: './tablas-page.component.html',
  styleUrls: ['./tablas-page.component.css']
})
export class TablasPageComponent implements OnInit{
  
  tablasList:Producto[] = [];
  constructor(private _productoService:ProductoService ,  private toastr: ToastrService){}
  
  ngOnInit(): void {
    this.obtenerProductos();
  }
  obtenerProductos(){
    this._productoService.getProducto().subscribe( data =>{
      // /* Filtramos por tablas */
      this.tablasList = data.filter( (item: { categoria: string; }) => item.categoria === 'tablas' );
    }, error =>{
      console.log(error);
    })
  }

}
