import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  id: string | null;
  producto: any;

 
  constructor(private fb: FormBuilder,
            private _productoService: ProductoService,
            private toastr: ToastrService,
            private aRouter: ActivatedRoute,
            private router: Router){
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    this.obtenerProducto();
  }

  public productoForm: FormGroup = this.fb.group({
    nombreProducto:['',Validators.required],
    descripcion:['',Validators.required],
    imagen:['',Validators.required],
    precio:['',Validators.required],
    stock:['',Validators.required],
    categoria:['',Validators.required],
    talle:[''],
    medida:[''],
  });

  obtenerProducto(){
    if(this.id !== null){
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        console.log(data);
          this.producto = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  esEditar(){
    if(this.id !== null){
      this._productoService.obtenerProducto(this.id).subscribe(data =>{
        this.productoForm.setValue({
          nombreProducto: data.nombreProducto,
          descripcion:data.descripcion,
          imagen:data.imagen,
          precio:data.precio,
          stock:data.stock,
          categoria:data.categoria,
          talle:data.talle,
          medida:data.medida,
        })
      })
    }
  }
  
  editarProducto(){
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
    if(this.id !== null){
      console.log(PRODUCTO);
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data =>{
      this.toastr.info('Se actualizo el producto exitosamente!', 'Producto actualizado');
      }, error => {
        console.log(error);
        this.productoForm.reset();}
      )
    }
  }
  deshabilitarProducto(){
      if (this.id !== null){
        this._productoService.deshabilitarProducto(this.id).subscribe(
          ()=>{
            this.toastr.error('El producto ha sido eliminado.', 'Producto Deshabilitado');
            this.router.navigate(['/administrador/productos']).then(() => {
              window.location.reload();
          });
          
          },(error) => {
            console.error(error);
          }
        );
      }
    }
  // deshabilitarProducto() {
  //   if (this.id !== null) {
  //     this._productoService.cambiarEstadoProducto(this.id, false).subscribe(
  //       () => {
  //         this.toastr.info('El producto ha sido deshabilitado.', 'Producto Deshabilitado');
  //         // Puedes redirigir al usuario a la lista de productos o realizar otras acciones aquí
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   }
  // }
  
}
