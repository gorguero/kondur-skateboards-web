export class Check{
    _id?: string;
    titulo: string;
    descripcion: string;
    ig_filmer: string;
    ig_rider: string;
    img_rider: string;
    url_video: string;
    creadoEn?: Date;
    actualizadoEn?: Date;
    estado?: boolean;

    constructor(titulo: string, descripcion: string, ig_filmer: string, ig_rider: string, img_rider: string, url_video: string, creadoEn: Date, actualizadoEn: Date, estado: boolean){
        this.titulo= titulo,
        this.descripcion= descripcion,
        this.ig_filmer= ig_filmer,
        this.ig_rider= ig_rider,
        this.img_rider= img_rider,
        this.url_video= url_video,
        this.creadoEn= creadoEn,
        this.actualizadoEn= actualizadoEn,
        this.estado= estado;
    }
}
module.exports = Check;