import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  
 public productoForm: FormGroup = this.fb.group({
    nombreProducto:['',Validators.required],
    descripcion:['',Validators.required],
    imagen:['',Validators.required],
    precio:['',Validators.required],
    stock:['',Validators.required],
    categoria:['',Validators.required],
    talle:[''],
    medida:[''],
  },{ validator: this.atLeastOneFieldRequired() });

  listProductos: Producto[] = []

  // Validacion para los campos talle y medida, activa el formulario si almenos uno esta lleno
  atLeastOneFieldRequired(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const medidaValue = control.get('medida')?.value;
      const talleValue = control.get('talle')?.value;

      // Verificar que al menos uno de los campos tenga valor
      if ((!medidaValue && !talleValue) || (medidaValue && talleValue)) {
        return { 'atLeastOneFieldRequired': true };
      }
      return null; // Es válido
    };
  } 
  // Valida que haya una categoria seleccionada para mostrar medidas o talle
  constructor(private fb: FormBuilder,
              private _productoService: ProductoService,
              private toastr: ToastrService,
              private router: Router){
    this.categoriaSeleccionada = '';
    this.input1Habilitado = false;
    this.input2Habilitado = false;
  }
  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.categoriaSeleccionada = selectElement.value;

    if (this.categoriaSeleccionada === 'indumentaria') {
      this.input2Habilitado = true;
      this.input1Habilitado = false;
    }
    if (this.categoriaSeleccionada === 'lijas') {
      this.input1Habilitado = true;
      this.input2Habilitado = false;
    }
    if (this.categoriaSeleccionada === 'tablas') {
      this.input1Habilitado = true;
      this.input2Habilitado = false;
    }
    if (this.categoriaSeleccionada === '') {
      this.input1Habilitado = false;
      this.input2Habilitado = false;
    }
  }
  //resetea el formulario al apretar cancelar
  resetearFormulario() {
    this.productoForm.reset();
  }
  ngOnInit(): void {
    this.obtenerProductos();
    
  }

  agregarProducto(){
    console.log(this.productoForm);
    console.log(this.productoForm.get('producto')?.value);

    const PRODUCTO: Producto ={
      nombreProducto: this.productoForm.get('nombreProducto')?.value,
      descripcion: this.productoForm.get('descripcion')?.value,
      imagen: this.productoForm.get('imagen')?.value,
      precio: this.productoForm.get('precio')?.value,
      stock: this.productoForm.get('stock')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      talle: this.productoForm.get('talle')?.value,
      medida: this.productoForm.get('medida')?.value

    }
    console.log(PRODUCTO);
    this._productoService.guardarProducto(PRODUCTO).subscribe(data =>{
      this.toastr.success('Se agrego un producto exitosamente!', 'Producto agregado');
      window.location.reload();
    }, error => {
      console.log(error);
      this.productoForm.reset();}
    )
  }

  obtenerProductos(){
    this._productoService.getProducto().subscribe(data =>{
      console.log(data);
      this.listProductos = data;
    }, error =>{
      console.log(error);
    })
  }

}
