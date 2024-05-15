import { Component, OnInit } from '@angular/core';
import { CargarProductos } from 'src/app/interfaces/cargar-productos.interface';
// import { ToastrService } from 'ngx-toastr';
// import { ItemCarrito } from 'src/app/models/itemCarrito.model';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-layout-tienda',
  templateUrl: './layout-tienda.component.html',
  styleUrls: ['./layout-tienda.component.css']
})
export class LayoutTiendaComponent implements OnInit{
  
  indumentariaList:Producto[] = [];
  lijasList:Producto[] = [];
  tablasList:Producto[] = [];
  productosList:Producto[] = [];

  constructor(private _productoService:ProductoService){}

  ngOnInit(): void {
    this.obtenerProductos();
    this.getAllProductos();
  }

  obtenerProductos(){

    this._productoService.getProductosPaginados()
      .subscribe({
        next: ({productos, totalProductos}:CargarProductos) => {

          /* Filtramos por indumentaria 
          this.indumentariaList = productos.filter( (item: { categoria: string; }) => item.categoria === 'indumentaria' );*/

          /* Filtramos por tablas 
          this.tablasList = productos.filter( (item: { categoria: string; }) => item.categoria === 'tablas' );*/

          /* Filtramos por lijas */
          this.lijasList = productos.filter( (item: { categoria: string; }) => item.categoria === 'lijas' );

          this.productosList = productos;
        }
      });
      this.getIndumentariaList();
  }

  getIndumentariaList(){
    this._productoService.getProductsFilter('indumentaria')
      .subscribe({
        next: (resp:any) => {
          this.indumentariaList = resp;
        },
        error: err => {
          console.log(err)
        }
      });
  }
  
  getAllProductos(){
    this._productoService.getProductsFilter('tablas')
      .subscribe({
        next: (resp:any) => {
          this.tablasList = resp;
          console.log(this.tablasList);
        }
        
      });
  }

}
