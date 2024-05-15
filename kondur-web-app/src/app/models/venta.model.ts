import { ItemCarrito } from "../interfaces/itemCarrito.interface";

export class Venta {
  constructor(
    public productos: ItemCarrito[],
    public total: number,

    public nombre: string,
    public apellido: string,
    public nro_contacto: number,
    public tipo_documentacion: string,
    public numero_documentacion: number,
    
    public provincia: string,
    public localidad: string,
    public direccion: string,
    public telefono: number,
    public codPostal: number,
    
    public creado_en: Date,
    public estado: string,

    public user_id?: string,
    public email?: string,
  ) {}
}

export default Venta;
