export class Team{
    _id?: string;
    nombre_rider: string;
    biografia: string;
    url_imagen: string;
    instagram: string;
    facebook: string;
    creadoEn?: Date;
    actualizadoEn?: Date;
    estado?: boolean;

    constructor(nombre_rider: string, biografia: string, url_imagen: string, instagram: string, facebook: string, creadoEn: Date, actualizadoEn: Date, estado: boolean){
    this.nombre_rider= nombre_rider,
    this.biografia= biografia,
    this.url_imagen= url_imagen,
    this.instagram= instagram,
    this.facebook= facebook,
    this.creadoEn= creadoEn,
    this.actualizadoEn= actualizadoEn,
    this.estado= estado
    }
}
module.exports = Team;