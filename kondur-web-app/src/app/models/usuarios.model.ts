
export class Usuarios {
  constructor(
    public nombre: string,
    public apellido: string,
    public nickname: string,
    public email: string,
    public password?: string, //Revisar este valor
    public repeatPass?: string,
    public creadoEn?: Date,
    public actualizadoEn?: Date,
    public rol?: 'ADMIN_ROLE' | 'USER_ROLE',
    public estado?: boolean,
    public uid?: string,
    public direcciones?: {},
    public nro_contacto?: string //si se rompe fue por esto
  ) {}
}

export default Usuarios;
