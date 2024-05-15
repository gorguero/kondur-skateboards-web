import { ItemCarrito } from "./itemCarrito.interface";

export interface Venta {
  user_id?: string;
  productos: ItemCarrito[];
  total: number;
  nombre: string;
  apellido: string;
  nro_contacto: number;
  tipo_documentacion: string;
  numero_documentacion: number;
  provincia: string;
  localidad: string;
  direccion: string;
  telefono: number;
  codPostal: number;
  creado_en: Date;
  estado: string;
    email?: string;
  }
  