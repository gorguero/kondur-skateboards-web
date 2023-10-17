import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto, Talla } from 'src/app/models/producto.model';
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

  ngOnInit(): void {
    this.obtenerProductos();
    // this.calcularSumaCantidadesTallas();
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
    tallas: this.fb.array([]),
     
  }, { });

  get tallas(){
    return this.productoForm.get('tallas') as FormArray;
  }

  // Agregar una nueva talla o medida en el form
  agregarTalla() {
    const tallaFormGroup = this.fb.group({
      nombre: [''],
      cantidad: ['']
    });
  
    this.tallas.push(tallaFormGroup);
  }

  // Eliminar una talla o medida específica por índice
  eliminarTalla(index: number) {
    const tallas = this.productoForm.get('tallas') as FormArray;
    tallas.removeAt(index);
  }
  // CALCULO DE TOTAL DE TALLAS DISPONIBLES
  

  // calcularSumaCantidadesTallas() {
  //   this.sumaCantidadesTallas = 0; // Reinicializa la suma a 0 antes de calcular

  //   for (const producto of this.listProductos) {
  //     for (const talla of producto.tallas) {
  //       this.sumaCantidadesTallas += talla.cantidad;
  //     }
  //   }
  // }

  
  // funcion que me permite validar si una de las
  // dos opciones de categoria  esta seleccionado
  // onSelectChange(event: Event): void {
  //   const selectElement = event.target as HTMLSelectElement;
  //   this.categoriaSeleccionada = selectElement.value;

  //   if (this.categoriaSeleccionada === 'indumentaria') {
  //     this.input2Habilitado = true;
  //     this.input1Habilitado = false;
  //   }
  //   if (this.categoriaSeleccionada === 'lijas') {
  //     this.input1Habilitado = true;
  //     this.input2Habilitado = false;
  //   }
  //   if (this.categoriaSeleccionada === 'tablas') {
  //     this.input1Habilitado = true;
  //     this.input2Habilitado = false;
  //   }
  //   if (this.categoriaSeleccionada === '') {
  //     this.input1Habilitado = false;
  //     this.input2Habilitado = false;
  //   }
  // }
  
  //resetea el formulario al apretar cancelar
  resetearFormulario() {
    this.productoForm.reset();
  }

  agregarProducto() {
    // Acceder a los valores del formulario
    const nombreProducto = this.productoForm.get('nombreProducto')?.value;
    const descripcion = this.productoForm.get('descripcion')?.value;
    const imagen = this.productoForm.get('imagen')?.value;
    const precio = this.productoForm.get('precio')?.value;
    const categoria = this.productoForm.get('categoria')?.value;
    const tallas = this.productoForm.get('tallas')?.value as Talla[];
  
  
    // Crear un objeto de Producto
    const PRODUCTO: Producto = {
      nombreProducto,
      descripcion,
      imagen,
      precio,
      categoria,
      tallas// Puedes establecer la fecha de creación
    };

    this._productoService.guardarProducto(PRODUCTO).subscribe(data =>{
      this.toastr.success('Se agrego un producto exitosamente!', 'Producto agregado');
      window.location.reload();
    }, error => {
      console.log(error);
      this.productoForm.reset();}
      )
      console.log(PRODUCTO);
  }
  obtenerProductos(){
    this._productoService.getProducto().subscribe(data =>{
      this.listProductos = data;
    }, error =>{
      console.log(error);
    })
  }

  eliminarProducto(id: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this._productoService.deshabilitarProducto(id).subscribe(
        () => {
          this.toastr.success('El corredor se eliminó exitosamente', 'Corredor eliminado');
          this.obtenerProductos(); // Actualiza la lista después de eliminar
        },error => {
          console.log(error);
          this.toastr.error('Hubo un error al eliminar el corredor', 'Error');
        }
      );
    }
  }

}
