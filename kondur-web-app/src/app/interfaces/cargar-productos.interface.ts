import { Producto } from "../models/producto.model";


export interface CargarProductos{
    totalProductos:number;
    productos:Producto[]
}