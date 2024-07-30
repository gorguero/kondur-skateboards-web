import { Component, OnInit, ChangeDetectorRef,ViewChild  } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';
import { VentaPorMes } from 'src/app/interfaces/ventaPorMes.interface';
import { CurrencyPipe } from '@angular/common';
import { Location } from '@angular/common';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexResponsive,
  ApexLegend,
  ApexPlotOptions,
  ApexDataLabels,
  ApexYAxis,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  labels?: string[];
  responsive: ApexResponsive[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  yaxis?: ApexYAxis;
  tooltip: ApexTooltip;
};
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  providers: [CurrencyPipe]
})
export class StatsComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptionsIngresos: Partial<ChartOptions>;
  public pieChartOptions: Partial<ChartOptions>;
  productosPorCategoria: any;
  totalVentas: number = 0;
  ingresosTotales: number = 0;
  productosMasVendidos: any;
  ventasPorMes: any;
  ingresosPorMes: VentaPorMes[] = [];
  mesesVentas: string[] = [];
  mesesIngresos: any[] = [];

  constructor(private location: Location,private statsService: StatsService, private cdr: ChangeDetectorRef, private currencyPipe: CurrencyPipe) {
    // this.chartOptionsVentas = {
    //   series: [
    //     {
    //       name: "Ventas",
    //       data: []
    //     }
        
    //   ],
    //   chart: {
    //     type: "bar",
    //     height: 350
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: true
    //     }
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   xaxis: {
    //     categories: []
    //   },
      
    // };
    this.chartOptionsIngresos = {
      series: [
        {
          name: "$",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Ingresos por Mes (Pesos argentinos - ARS)"
      },
      xaxis: {
        categories: []
      },
      dataLabels: {
        formatter: (val) => {
          return Number(val)+"$";
        }
      },
      yaxis: {
        labels: {
          formatter: (val) => {
            return val +"$";
          }
        }
      }
    };

    this.pieChartOptions = {
      series: [],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: [],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }],
      title: {
        text: "Productos cargados por Categoría"
      }
    };
  
  }
  
  ngOnInit(): void {
    this.statsService.getTotalVentas().subscribe(data => this.totalVentas = data.totalVentas);
    this.statsService.getIngresosTotales().subscribe(data => this.ingresosTotales = data.totalIngresos);
    this.statsService.getVentasPorMes().subscribe(data => this.ventasPorMes = data);
    this.statsService.getProductosMasVendidos().subscribe(data => {
      this.productosMasVendidos = data;
      console.log('Productos Más Vendidos:', this.productosMasVendidos);
    });

   
    

    // this.statsService.getVentasPorMes().subscribe((data: VentaPorMes[]) => {
    //   console.log('Datos de ventas por mes:', data); 
    //   this.mesesVentas = data.map(item => `Mes ${item._id}`);
    //   console.log('Datos de ingresos por mes:',this.mesesVentas);
    //   this.chartOptionsVentas.xaxis ={
    //     categories: this.mesesVentas
    //   }
    //   if (this.chartOptionsVentas && this.chartOptionsVentas.xaxis && this.chartOptionsVentas.series) {
    //     // this.chartOptionsVentas.xaxis.categories = data.map(item => `Mes ${item._id}`);
    //     this.chartOptionsVentas.series[0].data = data.map(item => item.total);
    //   }
    // });


    // ingresos por mes
    this.statsService.getIngresosPorMes().subscribe((data: VentaPorMes[]) => {
      this.mesesIngresos = data.map(item =>{`Mes ${item._id}`});
      this.chartOptionsIngresos.xaxis ={
        categories: this.mesesVentas
      }
      if(this.chartOptionsIngresos && this.chartOptionsIngresos.xaxis && this.chartOptionsIngresos.series){
        this.chartOptionsIngresos.xaxis.categories = data.map(item => `Mes ${item._id}`);
        this.chartOptionsIngresos.series[0].data = data.map(item => item.total );
      }
    });
  
    // Grafico de torta
    this.statsService.getTotalProductosPorCategoria().subscribe(data => {
      console.log('datos de torta: ', data);
      
      this.productosPorCategoria = data;
      const categorias = data.map((item: any) => item._id);
      const totalProductos = data.map((item: any) => item.total);

      this.pieChartOptions.labels = categorias;
      this.pieChartOptions.series = totalProductos;
      this.cdr.detectChanges();
    });
  
  }
  goBack(): void {
    this.location.back();
  }
}
