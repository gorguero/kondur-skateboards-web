import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CargarProductos } from 'src/app/interfaces/cargar-productos.interface';
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
    this.obtenerProductosIndumentaria();
  }

  obtenerProductosIndumentaria(){
    this._productoService.getProductsFilter( 'indumentaria' )
      .subscribe({
        next: (resp:any) => {
          this.indumentariaList = resp;
        }
      });
  }
  
  agregarCarrito(producto: Producto){
    if (producto._id) { // Verificación de nulidad
      let iCarrito: ItemCarrito ={
        nombreProducto: producto.nombreProducto,
        imagen: producto.imagen,
        precio: producto.precio,
        cantidad: 1,
        _id: producto._id
      }
      if(localStorage.getItem("carrito") === null){
        let carrito: ItemCarrito[]=[];
        carrito.push(iCarrito);
        localStorage.setItem("carrito", JSON.stringify(carrito));
      } else {
        let carritoStorage = localStorage.getItem("carrito") as string;
        let carrito = JSON.parse(carritoStorage);
        carrito.push(iCarrito);
        localStorage.setItem("carrito", JSON.stringify(carrito));
      }
    } else {
      // Manejar el caso donde _id es undefined
      console.error('El producto no tiene un _id definido:', producto);
    }
    this.toastr.success('Producto agregado al carrito', 'Éxito', {
      timeOut: 3000,  // Duración del mensaje (en milisegundos)
      progressBar: true,  // Muestra la barra de progreso
      closeButton: true,  // Muestra el botón de cerrar
    });
  }
}
