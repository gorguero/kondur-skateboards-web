export class Producto{
    constructor(
        public nombreProducto: string,
        public descripcion: string,
        public imagen: string,
        public precio: number,
        public stock: number,
        public categoria: string,
        public talle: string,
        public medida: string,
        public creadoEn?: Date,
        public estado?: boolean
    ){}
}
module.exports = Producto;