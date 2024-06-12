import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import Venta from 'src/app/models/venta.model';
import { VentaServices } from 'src/app/services/venta.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-detalle-factuacion',
  templateUrl: './detalle-factuacion.component.html',
  styleUrls: ['./detalle-factuacion.component.css']
})
export class DetalleFactuacionComponent implements OnInit {
  private id: any = '';
  public ventaActual: any ={};

  constructor(
    private aRouter: ActivatedRoute, 
    private _ventaService: VentaServices,
    private location: Location
  ) {
    // this.subTotal = this.orderItems.reduce((acc, item) => acc + item.total, 0);
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this._ventaService.getVentaById(this.id)
    .subscribe((venta: Venta)=>{
      this.ventaActual = venta;
      console.log(this.ventaActual);
      
    })
  }

  getTotalProducto(producto: any): number {
    return producto.precio * producto.cantidad;
  }

  getTotalVenta(): number {
    return this.ventaActual.productos.reduce((total: number, producto: any) => {
      return total + this.getTotalProducto(producto);
    }, 0);
  }

  downloadPDF(ventaId: string) {
    this._ventaService.generatePDF(ventaId).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'detalle-compra.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error generating PDF', error);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
