export class ItemCarrito {
    constructor(
      public nombreProducto: string,
      public imagen: string,
      public precio: number,
      public cantidad: number,
      public talla?: string,
      public medida?: string,
      public _id?: string
    ) {}
  }
  
  module.exports = ItemCarrito;
    