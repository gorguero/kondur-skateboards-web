export class Producto {
    _id?: string;
    nombreProducto: string;
    descripcion: string;
    imagen: string;
    precio: number;
    categoria: string;
    tallas: { nombre: string, cantidad: number }[]; // Arreglo de tallas o medidas
    estado?: boolean;
    creadoEn?: Date;
  
    constructor(
      nombreProducto: string,
      descripcion: string,
      imagen: string,
      precio: number,
      categoria: string,
      tallas: { nombre: string, cantidad: number }[], // Incluye las tallas o medidas
      estado: boolean,
      creadoEn: Date
    ) {
      this.nombreProducto = nombreProducto;
      this.descripcion = descripcion;
      this.imagen = imagen;
      this.precio = precio;
      this.categoria = categoria;
      this.tallas = tallas;
      this.estado = estado;
      this.creadoEn = creadoEn;
    }
  }
  
export class Talla {
  _id?: string;
  nombre: string;
  cantidad: number;

  constructor(nombre: string, cantidad: number) {
      this.nombre = nombre;
      this.cantidad = cantidad;
  }
}

module.exports = Producto;
  