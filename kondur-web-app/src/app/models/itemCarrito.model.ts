export class ItemCarrito {
    constructor(
      public nombreProducto: string,
      public imagen: string,
      public precio: number,
      public talla: string,
      public medida: string,
      public cantidad: number,
      public _id?: string
    ) {}
  }
  
  module.exports = ItemCarrito;
    