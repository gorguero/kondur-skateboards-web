import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  listProductos: Producto[] = []

  constructor(private _productoService: ProductoService){}
  ngOnInit(): void {
    this.obtenerProductos();
    
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
