import { Component, OnInit } from '@angular/core';
import { CargarVentas, VentasServiceResp } from 'src/app/interfaces/cargar-ventas.interface';
import { VentaServices } from 'src/app/services/venta.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  listVentasPaginated: CargarVentas[] = [];
  totalVentas: number = 0;
  desde: number = 0;
  nombreCliente: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  constructor(private _ventasService: VentaServices) {}

  ngOnInit(): void {
    this.cargarVentas();
  }

  // Carga productos paginados
  cargarVentas() {
    this._ventasService.getVentasPaginadas(this.desde, this.nombreCliente, this.fechaInicio, this.fechaFin)
      .subscribe({
        next: (resp: VentasServiceResp) => {
          this.listVentasPaginated = resp.ventas;
          this.totalVentas = resp.totalVentas;
        },
        error: (err) => console.log(err)
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalVentas) {
      this.desde -= valor;
    }

    this.cargarVentas();
  }
  buscarVentas() {
    this.desde = 0;
    this.cargarVentas();
  }
  getTotalVenta(productos: any[]): number {
    return productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  }
}
