import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  productosPorCategoria: any;
  totalVentas: number = 0;
  ventasPorMes: any;
  ingresosTotales: number = 0;
  productosMasVendidos: any;

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.statsService.getTotalProductosPorCategoria().subscribe(data => this.productosPorCategoria = data);
    this.statsService.getTotalVentas().subscribe(data => this.totalVentas = data.totalVentas);
    this.statsService.getVentasPorMes().subscribe(data => this.ventasPorMes = data);
    this.statsService.getIngresosTotales().subscribe(data => this.ingresosTotales = data.totalIngresos);
    this.statsService.getProductosMasVendidos().subscribe(data => this.productosMasVendidos = data);
  }
}