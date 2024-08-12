import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto.model';
import { ToastrService } from 'ngx-toastr';
import { ItemCarrito } from 'src/app/models/itemCarrito.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  id: string | null;
  producto: Producto | any = {
    tallas: {},
    medidas: {},
  };
  cantidadSeleccionada: number = 1;
  tallaSeleccionada: string | null = null;
  medidaSeleccionada: string | null = null;
  productosRelacionados: Producto[] = [];
  productosRelacionadosGrupos: Producto[][] = [];

  cantidadMaximaProductosRelacionados: number = 4;
  listaCompletaDeProductos: Producto[] = [];
  categoriaProducto: any;
  productosAmostrar: Producto[] = [];

  constructor(
    private _productoService: ProductoService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.obtenerProducto();
    this.aRouter.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        if (this.id !== null) {
          forkJoin([
            this._productoService.obtenerProducto(this.id),
            this._productoService.getProducto(),
          ]).subscribe({
            next: ([producto, productos]) => {
              this.producto = producto;
              this.listaCompletaDeProductos = productos;
              this.obtenerProductosRelacionados();
            },
            error: (err) => {
              console.error(err);
            },
          });
        } else {
          console.error('ID de producto es null.');
        }
      }
    });
  }

  obtenerProducto() {
    if (this.id !== null) {
      this._productoService.obtenerProducto(this.id).subscribe({
        next: (data: any) => {
          this.producto = data;
          this.categoriaProducto = this.producto.categoria;
          console.log(this.categoriaProducto);
          this.obtenerProductosMismaCategoria();

          this.obtenerProductosRelacionados();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  obtenerProductosRelacionados() {
    if (this.producto?.categoria !== '') {
      this.productosAmostrar = this.productosRelacionados
        .filter((producto) => producto._id !== this.producto._id)
        .slice(0, this.cantidadMaximaProductosRelacionados);

      this.productosRelacionadosGrupos = this.agruparProductos(
        this.productosAmostrar,
        3
      );
    } else {
      console.log('La categoría del producto es undefined.');
    }
  }

  agruparProductos(productos: Producto[], tamanoGrupo: number): Producto[][] {
    const grupos = [];
    for (let i = 0; i < productos.length; i += tamanoGrupo) {
      grupos.push(productos.slice(i, i + tamanoGrupo));
    }
    return grupos;
  }

  agregarCarrito(producto: Producto) {    
    if (
      this.producto &&
      (this.producto.categoria.toLowerCase() === 'lijas' ||
        this.tallaSeleccionada !== null ||
        this.medidaSeleccionada !== null)
    ) {
      let iCarrito: ItemCarrito = {
        nombreProducto: this.producto.nombreProducto,
        imagen: this.producto.imagen,
        precio: this.producto.precio,
        cantidad: this.cantidadSeleccionada,
        talla: this.tallaSeleccionada,
        medida: this.medidaSeleccionada,
        _id: this.producto._id,
      };

      let carrito: ItemCarrito[] = localStorage.getItem('carrito')
        ? JSON.parse(localStorage.getItem('carrito') as string)
        : [];

      carrito.push(iCarrito);
      localStorage.setItem('carrito', JSON.stringify(carrito));

      this.toastr.success('Producto agregado al carrito', 'Éxito', {
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
      });
    } else {
      console.error(
        'El producto no tiene un _id definido o no se ha seleccionado una talla:',
        this.producto
      );
    }
  }

  verMas(id: string | null | undefined) {
    console.log('ID:', id);

    if (id !== undefined && id !== null) {
      this.router.navigate(['/tienda', id]);
    } else {
      console.error(
        'ID es null o undefined. No se puede realizar la navegación.'
      );
    }
  }

  obtenerProductosMismaCategoria() {
    this._productoService.getProductsFilter(this.categoriaProducto).subscribe({
      next: (resp: any) => {
        this.productosRelacionados = resp;
        console.log(this.productosRelacionados);
      },
    });
  }

  isCategoryLijas(producto: any): boolean {
    return producto.categoria.toLowerCase() === 'lijas';
  }
}
