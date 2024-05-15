import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  cantidadMaximaProductosRelacionados: number = 4;
  listaCompletaDeProductos: Producto[] = [];

  constructor(
    private _productoService: ProductoService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private router: Router)
  { this.id = this.aRouter.snapshot.paramMap.get('id');}

  ngOnInit(): void {
    this.obtenerProducto();
    this.obtenerTodosLosProductos();
    this.obtenerProductosRelacionados();
    this.obtenerProductosRelacionadosIndumentaria();
  }

  obtenerProducto() {
    if (this.id !== null) {
      this._productoService.obtenerProducto(this.id)
      .subscribe({
        next: (data:any) => {
          this.producto = data;

          this.obtenerProductosRelacionados();
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }
  obtenerTodosLosProductos() {
    this._productoService.getProducto().subscribe(
      (productos) => {
        this.listaCompletaDeProductos = productos;
  
        this.obtenerProductosRelacionados();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  obtenerProductosRelacionados() {if (this.producto.categoria !== undefined) {
      // Filtra la lista completa de productos para excluir el producto actual
      this.productosRelacionados = this.listaCompletaDeProductos
        .filter(producto => producto.categoria === this.producto.categoria && producto._id !== this.producto._id)
        .slice(0, this.cantidadMaximaProductosRelacionados);
    } else {
      console.log('La categoría del producto es undefined.');
    }
  }
  


  agregarCarrito(producto: Producto) {
    if (this.producto.categoria.toLowerCase() === 'lijas' || this.tallaSeleccionada) {
      let iCarrito: ItemCarrito = {
        nombreProducto: this.producto.nombreProducto,
        imagen: this.producto.imagen,
        precio: this.producto.precio,
        cantidad: this.cantidadSeleccionada,
        talla:this.tallaSeleccionada,
        medida:this.tallaSeleccionada,
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
  verMas(id: string | null | undefined) {
    console.log('ID:', id);
  
    if (id !== undefined && id !== null) {
      this.router.navigate(['/tienda', id]);
    } else {
      console.error('ID es null o undefined. No se puede realizar la navegación.');
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

  }

  isCategoryLijas(producto:any): boolean{
    console.log(producto.categoria)
    return producto.categoria.toLowerCase() === 'lijas';
  }

}
