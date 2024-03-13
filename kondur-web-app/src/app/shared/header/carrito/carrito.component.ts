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

    ngOnInit(): void {
      this.cargarCarrito();
    }

    vaciarCarrito(){
      localStorage.clear();
      this.listaItemsCarrito = [];
      localStorage.setItem("carrito", JSON.stringify(this.listaItemsCarrito));
      this.calcularMontoTotal(); // Agrega esta línea para recalcular el monto total
    }
    
    private cargarCarrito() {
      let carritoStorage = localStorage.getItem("carrito") as string;
      let carrito = this.eliminarDuplicados( JSON.parse(carritoStorage) );
      this.listaItemsCarrito = carrito || [];

      // Calcula el monto total al cargar el carrito
      this.calcularMontoTotal();
    }
    

    calcularMontoTotal() {
      // Suma los totales de los productos en el carrito
      this.montoTotal = this.listaItemsCarrito?.reduce((total, producto) => {
        return total + (producto.precio * producto.cantidad);
      }, 0) || 0;
    }

    eliminarProducto(id: string | undefined) {
      if (id) {
        
        this.listaItemsCarrito = this.listaItemsCarrito?.filter(producto => producto._id !== id);
        if( this.listaItemsCarrito?.length === 0){
          this.vaciarCarrito();
        }
        // Vuelve a calcular el monto total después de eliminar el producto
        this.calcularMontoTotal();
      } else {
        console.error('El id del producto no está definido.');
      }
    }

    private guardarCarritoEnLocalStorage() {
      localStorage.setItem("carrito", JSON.stringify(this.listaItemsCarrito));
    }

    private eliminarDuplicados(carritoList: any[]): any[] {
      return carritoList.filter((item, index, self) =>
          index === self.findIndex((t) => (
              t._id === item._id 
          ))
      );
    }
}
