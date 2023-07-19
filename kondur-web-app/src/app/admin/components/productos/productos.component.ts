import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    talle:['',Validators.required],
    medida:['',Validators.required],


 });

  listProductos: Producto[] = []

  constructor(private fb: FormBuilder, private _productoService: ProductoService){
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
  ngOnInit(): void {
    this.obtenerProductos();
    
  }

  agregarProducto(){
    console.log(this.productoForm);
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
