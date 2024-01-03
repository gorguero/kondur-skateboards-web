export class Producto {
  constructor(
    public nombreProducto: string,
    public descripcion: string,
    public imagen: string,
    public precio: number,
    public categoria: string,
    public estado?: boolean,
    public creadoEn?: Date,
    public tallas?:{},
    public medidas?:{}, // Incluye las tallas o medidas
    public _id?: string
  ) {}
}

module.exports = Producto;
  