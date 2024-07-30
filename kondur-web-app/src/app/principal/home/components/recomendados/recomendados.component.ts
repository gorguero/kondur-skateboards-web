import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { StatsService } from 'src/app/services/stats.service';


@Component({
  selector: 'app-recomendados',
  templateUrl: './recomendados.component.html',
  styleUrls: ['./recomendados.component.css']
})
export class RecomendadosComponent {
  productosMasVendidos: any[] = [];
  productosMasVendidosGrupos: any[][] = [];

  constructor(private statsService: StatsService){

  }

  ngOnInit(): void {
    this.statsService.getProductosMasVendidos().subscribe(data => {
      this.productosMasVendidos = data;
      this.productosMasVendidosGrupos = this.agruparProductos(data, 3);
      console.log('Productos Más Vendidos:', this.productosMasVendidosGrupos);
    });
  }

  agruparProductos(productos: any[], tamanoGrupo: number): any[][] {
    const grupos = [];
    for (let i = 0; i < productos.length; i += tamanoGrupo) {
      grupos.push(productos.slice(i, i + tamanoGrupo));
    }
    return grupos;
  }
}
