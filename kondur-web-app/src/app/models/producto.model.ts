export class Producto{
    _id?: string;
    nombreProducto: string;
    descripcion: string;
    imagen: string;
    precio: number;
    stock: number;
    categoria: string;
    talle: string;
    medida: string;
    creadoEn?: Date;
    estado?: boolean
    constructor(nombreProducto: string, decripcion: string, imagen: string, precio: number, stock: number, categoria: string, talle: string, medida: string, creadoEn: Date, estado: boolean){
        this.nombreProducto= nombreProducto,
        this.descripcion= decripcion,
        this.imagen= imagen,
        this.precio= precio,
        this.stock= stock,
        this.categoria= categoria,
        this.talle= talle,
        this.medida= medida,
        this.creadoEn= creadoEn,
        this.estado= estado
    }
}
module.exports = Producto;