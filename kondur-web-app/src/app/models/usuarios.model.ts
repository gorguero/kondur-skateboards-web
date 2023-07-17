export class Usuarios {
  constructor(
    public nombre: string,
    public apellido: string,
    public nickname: string,
    public email: string,
    public password: string,
    public repeatPass?: string,
    public creadoEn?: Date,
    public actualizadoEn?: Date,
    public rol?: string,
    public estado?: boolean,
    public direcciones?: string[],
  ) {}
}

module.exports = Usuarios;