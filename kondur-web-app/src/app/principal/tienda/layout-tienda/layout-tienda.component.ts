import { Component, OnInit } from '@angular/core';
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
  }

  obtenerProductos(){
    this._productoService.getProducto().subscribe( data =>{

      /* Filtramos por indumentaria */
      // this.indumentariaList = data.filter( (item: { categoria: string; }) => item.categoria === 'indumentaria' );

      // /* Filtramos por tablas */
      // this.tablasList = data.filter( (item: { categoria: string; }) => item.categoria === 'tablas' );

      // /* Filtramos por lijas */
      // this.lijasList = data.filter( (item: { categoria: string; }) => item.categoria === 'lijas' );

      this.productosList = data;
      console.log(data);

    }, error =>{
      console.log(error);
    })
  }

}
