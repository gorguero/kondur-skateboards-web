export class Usuarios {
  constructor(
    public nombre: string,
    public apellido: string,
    public nickname: string,
    public email: string,
    public password: string,
    public repeatPass: string,
    public direcciones: string[],
    public creadoEn: Date,
    public actualizadoEn: Date,
    public rol: 'ADMIN_ROLE' | 'USER_ROLE',
    public estado: boolean
  ) {}
}

module.exports = Usuarios;
