import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  private id: any = '';
  producto: any = {};
  public productoActual?: any = {};
  public productoTallas?: any = [];
  public productoMedidas?: any = [];
  public categoriaActual?: any='';

  constructor(private fb: FormBuilder,
            private _productoService: ProductoService,
            private toastr: ToastrService,
            private aRouter: ActivatedRoute,
            private router: Router){
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }
 
  public productoForm: FormGroup = this.fb.group({
    nombreProducto: ['', Validators.required],
    descripcion: ['', Validators.required],
    imagen: ['', Validators.required],
    precio: ['', Validators.required],
    categoria: ['', Validators.required],
    tallas: this.fb.group({
      s: [''],
      m: [''],
      l: [''],
      xl: ['']
    }),
    medidas: this.fb.group({
      chico: [''],
      mediano: [''],
      grande: ['']
    })
  },{ });

  preCargarForm() {
    if (this.productoActual) {
      const productFormEdit: any = {
        nombreProducto: this.productoActual.nombreProducto,
        descripcion: this.productoActual.descripcion,
        imagen: this.productoActual.imagen,
        precio: this.productoActual.precio,
        categoria: this.productoActual.categoria,
        tallas: {
          s: '',
          m: '',
          l: '',
          xl: ''
        },
        medidas: {
          chico: '',
          mediano: '',
          grande: ''
        }
      };
  
      if (this.productoActual.tallas) {
        productFormEdit.tallas = {
          s: this.productoActual.tallas.s || 0,
          m: this.productoActual.tallas.m || 0,
          l: this.productoActual.tallas.l || 0,
          xl: this.productoActual.tallas.xl || 0
        };
      }
  
      if (this.productoActual.medidas) {
        productFormEdit.medidas = {
          chico: this.productoActual.medidas.chico || 0,
          mediano: this.productoActual.medidas.mediano || 0,
          grande: this.productoActual.medidas.grande || 0
        };
      }
  
      console.log("Valores antes de patchValue:", productFormEdit.estado);
  
      this.productoForm.patchValue(productFormEdit);
  
      console.log("Producto Form después de asignar valores:", this.productoForm.value);
    }
  }
  
  ngOnInit(): void {
    this._productoService.obtenerProducto(this.id)
    .subscribe((producto: Producto) => {
      this.productoActual = producto;
      this.productoTallas = this.productoActual.tallas;
      this.productoMedidas = this.productoActual.medidas;

      this.preCargarForm();
      this.categoriaActual = this.productoActual.categoria;
      console.log(this.categoriaActual);
    });
  }

  editarProducto(): void{
    console.log(this.productoForm.value);

    const tallasGroup = this.productoForm.get('tallas') as FormGroup;
    const sTallaControl = tallasGroup.get('s');
    const mTallaControl = tallasGroup.get('m');
    const lTallaControl = tallasGroup.get('l');
    const xlTallaControl = tallasGroup.get('xl');

    const medidasGroup = this.productoForm.get('medidas') as FormGroup;
    const chicoMedidaControl = medidasGroup.get('chico');
    const medianoMedidaControl = medidasGroup.get('mediano');
    const grandeMedidaControl = medidasGroup.get('grande');

    const productEdit: Producto ={

     nombreProducto: this.productoForm.get('nombreProducto')?.value,
     descripcion: this.productoForm.get('descripcion')?.value,
     imagen: this.productoForm.get('imagen')?.value,
     precio: this.productoForm.get('precio')?.value,
     categoria: this.productoForm.get('categoria')?.value,
     estado: true,
     tallas: {
      s: sTallaControl?.value,
      m: mTallaControl?.value,
      l: lTallaControl?.value,
      xl: xlTallaControl?.value
     },
     medidas: {
      chico: chicoMedidaControl?.value,
      mediano: medianoMedidaControl?.value,
      grande: grandeMedidaControl?.value
     }
    }
    this._productoService.editarProducto(this.id, productEdit).subscribe(data =>{
      this.toastr.info('Se actualizo el producto exitosamente!', 'Producto actualizado');
      console.log("Contenido de productEdit:", productEdit);
      console.log(productEdit.estado + "esto se manda al final");
      
      window.location.reload();
      }, error => {
        console.log(error);
        this.productoForm.reset();}
      )
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
