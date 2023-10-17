import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto,Talla } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  id: string | null;
  producto: any = {};

 
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

  // public productoForm: FormGroup = this.fb.group({
  //   nombreProducto:['',Validators.required],
  //   descripcion:['',Validators.required],
  //   imagen:['',Validators.required],
  //   precio:['',Validators.required],
  //   stock:['',Validators.required],
  //   categoria:['',Validators.required],
  //   talle:[''],
  //   medida:[''],
  // });
  public productoForm: FormGroup = this.fb.group({
                        nombreProducto: ['', Validators.required],
                        descripcion: ['', Validators.required],
                        imagen: ['', Validators.required],
                        precio: ['', Validators.required],
                        categoria: ['', Validators.required],
                        tallas: this.fb.array([])
                      },{ });

  get tallas(){
    return this.productoForm.get('tallas') as FormArray;
  }
  
  obtenerProducto(){
    if(this.id !== null){
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        // console.log(data);
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
          categoria:data.categoria,
          tallas:data.tallas
        })
      })
    }
  }
  
  editarProducto(){
    const nombreProducto = this.productoForm.get('nombreProducto')?.value;
    const descripcion = this.productoForm.get('descripcion')?.value;
    const imagen = this.productoForm.get('imagen')?.value;
    const precio = this.productoForm.get('precio')?.value;
    const categoria = this.productoForm.get('categoria')?.value;
    const tallas = this.productoForm.get('tallas')?.value as Talla[];
    console.log(this.productoForm.get('tallas')?.value);
    
    
    
    const PRODUCTO: Producto = {
      nombreProducto,
      descripcion,
      imagen,
      precio,
      categoria,
      tallas// Puedes establecer la fecha de creación
    };
    if(this.id !== null){
      // console.log(PRODUCTO.tallas);
      console.log(PRODUCTO);
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data =>{
      this.toastr.info('Se actualizo el producto exitosamente!', 'Producto actualizado');
      // window.location.reload();
      }, error => {
        console.log(error);
        this.productoForm.reset();}
      )
    }
  }
  // Eliminar una talla o medida específica por índice
  eliminarTalla(index: number) {
  const tallas = this.productoForm.get('tallas') as FormArray;
  tallas.removeAt(index);
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
}
