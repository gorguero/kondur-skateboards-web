import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

import { CargarProductos } from 'src/app/interfaces/cargar-productos.interface';

import { Producto } from 'src/app/models/producto.model';
import { ToastrService } from 'ngx-toastr';
import { ItemCarrito } from 'src/app/models/itemCarrito.model';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  id: string | null;
  producto: any = {};
  cantidadSeleccionada: number = 1;
  tallaSeleccionada: string = '0';
  productosRelacionados: Producto[] = [];


  constructor(
    private _productoService: ProductoService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute)
  { this.id = this.aRouter.snapshot.paramMap.get('id');}

  ngOnInit(): void {
    this.obtenerProducto();
    this.obtenerProductosRelacionadosIndumentaria();
  }

  obtenerProducto() {
    if (this.id !== null) {
      this._productoService.obtenerProducto(this.id).subscribe(
        (data) => {
          this.producto = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  agregarCarrito(producto: Producto) {
    if (this.producto.categoria.toLowerCase() === 'lijas' || this.tallaSeleccionada) {
      let iCarrito: ItemCarrito = {
        nombreProducto: this.producto.nombreProducto,
        imagen: this.producto.imagen,
        precio: this.producto.precio,
        cantidad: this.cantidadSeleccionada,
        _id: this.producto._id
      };

      let carrito: ItemCarrito[] = localStorage.getItem("carrito")
        ? JSON.parse(localStorage.getItem("carrito") as string)
        : [];

      carrito.push(iCarrito);
      localStorage.setItem("carrito", JSON.stringify(carrito));

      this.toastr.success('Producto agregado al carrito', 'Éxito', {
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
      });
    } else {
      console.error('El producto no tiene un _id definido o no se ha seleccionado una talla:', this.producto);
    }
  }

  obtenerProductosRelacionadosIndumentaria(){

    this._productoService.getProductsFilter( 'indumentaria' )
      .subscribe({
        next: (resp:any) => {
          this.productosRelacionados = resp;
          console.log(this.productosRelacionados)
        }
      });
    // this._productoService.getProductosPaginados()
    //   .subscribe({
    //     next: ( { productos }:CargarProductos ) => {
    //       this.productosRelacionados = productos.filter( (item: { categoria: string; }) => item.categoria === 'indumentaria' );
    //       console.log(this.productosRelacionados)
    //     }
    //   })

  }

}
