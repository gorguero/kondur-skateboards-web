import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoIntf } from 'src/app/interfaces/producto.interface';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
  categoriaSeleccionada: string;
  input1Habilitado: boolean;
  input2Habilitado: boolean;
  listProductos: Producto[] = [];
  filteredProductos: any[] = [];
  searchTerm: string = '';
  sumaCantidadesTallas: number = 0;
  desde: number = 0;
  totalProductos: number = 0;

  ngOnInit(): void {
    // this.obtenerProductos();
    this.cargarProductos();
    this.productoForm.reset();
    // Suscribirse a cambios en la categoría
    this.productoForm.get('categoria')?.valueChanges.subscribe((categoria) => {
      this.actualizarFormulariosSegunCategoria(categoria);
    });
  }

  constructor(
    private fb: FormBuilder,
    private _productoService: ProductoService,
    private toastr: ToastrService
  ) {
    this.categoriaSeleccionada = '';
    this.input1Habilitado = false;
    this.input2Habilitado = false;
  }

  public productoForm: FormGroup = this.fb.group({
    nombreProducto: ['', Validators.required],
    descripcion: ['', Validators.required],
    imagen: ['', Validators.required],
    precio: ['', Validators.required],
    categoria: ['', Validators.required],
    tallas: this.fb.group({
      s: [0],
      m: [0],
      l: [0],
      xl: [0],
    }),
    medidas: this.fb.group({
      chico: [0],
      mediano: [0],
      grande: [0],
    }),
  });

  get tallas() {
    return this.productoForm.get('tallas') as FormArray;
  }

  // Agrega este método para manejar cambios en la categoría
  onCategoriaChange() {
    const categoria = this.productoForm.get('categoria')?.value;
    if (categoria === 'indumentaria') {
      this.categoriaSeleccionada = 'tallas';
    } else if (categoria === 'tablas') {
      this.categoriaSeleccionada = 'medidas';
    } else if (categoria === 'lijas') {
      this.categoriaSeleccionada = 'ninguna';
    } else {
      this.categoriaSeleccionada = 'ninguna';
    }
  }

  //resetea el formulario al apretar cancelar
  resetearFormulario() {
    this.productoForm.reset({
      tallas: { s: 0, m: 0, l: 0, xl: 0 },
      medidas: { chico: 0, mediano: 0, grande: 0 },
    });
  }

  //función para actualizar los formularios según la categoría seleccionada
  private actualizarFormulariosSegunCategoria(categoria: string) {
    const tallasControl = this.productoForm.get('tallas');
    const medidasControl = this.productoForm.get('medidas');

    tallasControl?.reset();
    medidasControl?.reset();

    if (categoria === 'indumentaria') {
      tallasControl?.enable();
      medidasControl?.disable();
    } else if (categoria === 'tablas') {
      tallasControl?.disable();
      medidasControl?.enable();
    } else {
      tallasControl?.disable();
      medidasControl?.disable();
    }
  }

  agregarProducto() {
    const productoData = this.productoForm.value;

    const categoria = this.productoForm.get('categoria')?.value;

    switch (categoria) {
      case 'tablas':
        productoData.medidas.chico = productoData.medidas.chico ?? 0;
        productoData.medidas.mediano = productoData.medidas.mediano ?? 0;
        productoData.medidas.grande = productoData.medidas.grande ?? 0;
        break;

      case 'indumentaria':
        productoData.tallas.s = productoData.tallas.s ?? 0;
        productoData.tallas.m = productoData.tallas.m ?? 0;
        productoData.tallas.l = productoData.tallas.l ?? 0;
        productoData.tallas.xl = productoData.tallas.xl ?? 0;
        break;
    }

    this._productoService.guardarProducto(productoData).subscribe(
      (data) => {
        this.toastr.success(
          'Se agrego un producto exitosamente!',
          'Producto agregado'
        );
        window.location.reload();
      },
      (error) => {
        console.log(error);
        this.productoForm.reset();
      }
    );
    console.log(this.productoForm.value);
  }

  //Carga productos paginados
  cargarProductos() {
    this._productoService.getProductosPaginados(this.desde).subscribe({
      next: ({ totalProductos, productos }) => {
        this.totalProductos = totalProductos;
        this.listProductos = productos;
        this.filteredProductos = productos; // Inicializar filteredProductos
      }
    });
  }
  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalProductos) {
      this.desde -= valor;
    }

    this.cargarProductos();
  }

  eliminarProducto(id: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this._productoService.deshabilitarProducto(id).subscribe(
        () => {
          this.toastr.success(
            'El corredor se eliminó exitosamente',
            'Corredor eliminado'
          );
          // this.obtenerProductos(); // Actualiza la lista después de eliminar
        },
        (error) => {
          console.log(error);
          this.toastr.error('Hubo un error al eliminar el corredor', 'Error');
        }
      );
    }
  }
  getStockStatus(producto: any): { color: string; message: string } {
    let hasZeroStock = false;
    let allZeroStock = true;
    let todoBien = false;
  
    if (producto.categoria === 'indumentaria') {
      for (let talla in producto.tallas) {
        if (producto.tallas[talla] > 0) {
          allZeroStock = false;
        } else if(producto.tallas[talla] == 0){
          hasZeroStock = true;
        }else{
          todoBien = true;
        }
      }
    } else if (producto.categoria === 'tablas') {
      for (let medida in producto.medidas) {
        if (producto.medidas[medida] > 0) {
          allZeroStock = false;
        } else if(producto.medidas[medida] == 0){
          hasZeroStock = true;
        }else{
          todoBien = true;
        }
      }
    }
  
    // Determinar el estado del stock
    if (allZeroStock) {
      return { color: 'text-danger', message: 'Producto sin stock' };
    } else if (hasZeroStock) {
      return { color: 'text-warning', message: 'Revisar el stock' };
    } else if(todoBien){
      return { color: 'text-secondary', message: '' };
    }else{
      return { color: 'text-secondary', message: '' };
    }
  }
  
  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredProductos = this.listProductos; // Mostrar todos los productos si no hay término de búsqueda
    } else {
      this.filteredProductos = this.listProductos.filter((producto) =>
        producto.nombreProducto.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  
}
