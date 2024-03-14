import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoIntf } from 'src/app/interfaces/producto.interface';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  categoriaSeleccionada: string;
  input1Habilitado: boolean;
  input2Habilitado: boolean;
  listProductos: Producto[] = [];
  sumaCantidadesTallas: number = 0;
  desde:number = 0;
  totalProductos:number = 0;

  ngOnInit(): void {
    // this.obtenerProductos();
    this.cargarProductos();
    this.productoForm.reset();
    // Suscribirse a cambios en la categoría
    this.productoForm.get('categoria')?.valueChanges.subscribe((categoria) => {
      this.actualizarFormulariosSegunCategoria(categoria);
    });
  }

  constructor(private fb: FormBuilder,
    private _productoService: ProductoService,
    private toastr: ToastrService
    ){
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
      xl: [0]
    }),
    medidas: this.fb.group({
      chico: [0],
      mediano: [0],
      grande: [0]
    })
     
  });

  get tallas(){
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
      medidas: { chico: 0, mediano: 0, grande: 0 }
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
    
    this._productoService.guardarProducto(productoData).subscribe(data =>{
      this.toastr.success('Se agrego un producto exitosamente!', 'Producto agregado');
      window.location.reload();
    }, error => {
      console.log(error);
      this.productoForm.reset();}
      )
      console.log(this.productoForm.value);
  }

  //Carga productos paginados
  cargarProductos(){
    this._productoService.getProductosPaginados(this.desde).subscribe({
      next: ({totalProductos, productos}) => {
        this.totalProductos = totalProductos;
        this.listProductos = productos;
      }
    })
  }
  cambiarPagina( valor:number ){
    this.desde += valor;

    if( this.desde < 0 ){
      this.desde = 0;
    }else if( this.desde >= this.totalProductos ){
      this.desde -= valor;
    }

    this.cargarProductos();
  }

  // obtenerProductos(){
  //   this._productoService.getProducto().subscribe(data =>{
  //     this.listProductos = data;
  //   }, error =>{
  //     console.log(error);
  //   })
  // }

  eliminarProducto(id: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this._productoService.deshabilitarProducto(id).subscribe(
        () => {
          this.toastr.success('El corredor se eliminó exitosamente', 'Corredor eliminado');
          // this.obtenerProductos(); // Actualiza la lista después de eliminar
        },error => {
          console.log(error);
          this.toastr.error('Hubo un error al eliminar el corredor', 'Error');
        }
      );
    }
  }

}
