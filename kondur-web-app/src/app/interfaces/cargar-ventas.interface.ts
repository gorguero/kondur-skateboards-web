export interface CargarVentas {
    _id:             string;
    user_id:         string;
    productos:       Producto[];
    direccion_envio: DireccionEnvio;
    comprador:       Comprador;
    estado:          string;
    creado_en:       Date;
    __v:             number;
}

export interface VentasServiceResp{
    totalVentas: number;
    ventas: CargarVentas[]
}

interface Comprador {
    nombre:               string;
    apellido:             string;
    nro_contacto:         number;
    tipo_documentacion:   string;
    numero_documentacion: number;
    _id:                  string;
}

interface DireccionEnvio {
    provincia: string;
    localidad: string;
    direccion: string;
    telefono:  number;
    codPostal: number;
    _id:       string;
}

interface Producto {
    nombreProducto: string;
    imagen:         string;
    precio:         number;
    cantidad:       number;
    talla:          string;
    medida:         string;
    _id:            string;
}