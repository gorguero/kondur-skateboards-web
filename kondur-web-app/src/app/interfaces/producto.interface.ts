export interface ProductoIntf{
    nombreProducto: String, 
    descripcion: String,
    imagen: String,
    precio: Number,
    creado_en: Date,
    categoria: String
    tallas: Tallas[],
    medidas: Medida[]
}

export interface Medida {
    chico:   number;
    mediano: number;
    grande:  number;
    _id:     string;
}

export interface Tallas{
    s: number;
    m: number;
    l: number;
    xl: number;
    _id:string;

}