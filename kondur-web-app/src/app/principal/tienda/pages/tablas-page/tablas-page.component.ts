import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-tablas-page',
  templateUrl: './tablas-page.component.html',
  styleUrls: ['./tablas-page.component.css']
})
export class TablasPageComponent implements OnInit{
  
  @Input() tablaList:Producto[] = [];
  
  ngOnInit(): void {
    console.log(this.tablaList)
  }

}
