import { Component } from '@angular/core';
import { ItemCarrito } from 'src/app/models/itemCarrito.model';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  listaItemsCarrito: ItemCarrito[] | undefined;
  montoTotal: number = 0;
  private carritoKey = "carrito";

  ngOnInit(): void {
    this.cargarCarrito();
  }
  // private cargarCarrito() {
  //   let carritoStorage = localStorage.getItem("carrito") as string;
  //   let carrito = JSON.parse(carritoStorage);
  //   this.listaItemsCarrito = carrito || [];

  //   // Calcula el monto total al cargar el carrito
  //   this.calcularMontoTotal();
  // }
  
  calcularMontoTotal() {
    // Suma los totales de los productos en el carrito
    this.montoTotal = this.listaItemsCarrito?.reduce((total, producto) => {
      return total + (producto.precio * producto.cantidad);
    }, 0) || 0;
  }


  private cargarCarrito() {
    let carritoStorage = localStorage.getItem(this.carritoKey);
    if (carritoStorage) {
      let carrito = JSON.parse(carritoStorage);
      this.listaItemsCarrito = carrito;
      this.calcularMontoTotal();
    } else {
      // Puedes manejar el caso en el que no haya datos en el carrito
      this.listaItemsCarrito = [];
      this.montoTotal = 0;
    }
  }

  private actualizarCarrito() {
    localStorage.setItem(this.carritoKey, JSON.stringify(this.listaItemsCarrito));
  }

  eliminarProducto(id: string | undefined) {
    if (id) {
      this.listaItemsCarrito = this.listaItemsCarrito?.filter(producto => producto._id !== id);
      this.actualizarCarrito();
      this.calcularMontoTotal();
    } else {
      console.error('El id del producto no está definido.');
    }
  }

  vaciarCarrito() {
    localStorage.removeItem(this.carritoKey);
    this.listaItemsCarrito = [];
    this.calcularMontoTotal();
  }

  private guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(this.listaItemsCarrito));
  }
}
