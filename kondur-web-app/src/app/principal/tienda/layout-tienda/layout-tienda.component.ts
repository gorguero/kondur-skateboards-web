import { Component, OnInit } from '@angular/core';
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
  }

  obtenerProductos(){
    this._productoService.getProducto().subscribe( data =>{

      /* Filtramos por indumentaria */
      this.indumentariaList = data.filter( (item: { categoria: string; }) => item.categoria === 'indumentaria' );

      // /* Filtramos por tablas */
      this.tablasList = data.filter( (item: { categoria: string; }) => item.categoria === 'tablas' );

      // /* Filtramos por lijas */
      this.lijasList = data.filter( (item: { categoria: string; }) => item.categoria === 'lijas' );

      this.productosList = data;
      console.log(data);

    }, error =>{
      console.log(error);
    })
  }
  // agregarCarrito(producto: Producto){
  //   if (producto._id) { // Verificación de nulidad
  //     let iCarrito: ItemCarrito ={
  //       nombreProducto: producto.nombreProducto,
  //       imagen: producto.imagen,
  //       precio: producto.precio,
  //       cantidad: 1,
  //       _id: producto._id
  //     }
  //     if(localStorage.getItem("carrito") === null){
  //       let carrito: ItemCarrito[]=[];
  //       carrito.push(iCarrito);
  //       localStorage.setItem("carrito", JSON.stringify(carrito));
  //     } else {
  //       let carritoStorage = localStorage.getItem("carrito") as string;
  //       let carrito = JSON.parse(carritoStorage);
  //       carrito.push(iCarrito);
  //       localStorage.setItem("carrito", JSON.stringify(carrito));
  //     }
  //   } else {
  //     // Manejar el caso donde _id es undefined
  //     console.error('El producto no tiene un _id definido:', producto);
  //   }
  //   this.toastr.success('Producto agregado al carrito', 'Éxito', {
  //     timeOut: 3000,  // Duración del mensaje (en milisegundos)
  //     progressBar: true,  // Muestra la barra de progreso
  //     closeButton: true,  // Muestra el botón de cerrar
  //   });
  // }
  

}
