export class ItemCarrito {
    constructor(
      public nombreProducto: string,
      public imagen: string,
      public precio: number,
      public cantidad: number,
      public talla?: string | null,
      public medida?: string | null,
      public _id?: string
    ) {}
  }
  
  module.exports = ItemCarrito;
    