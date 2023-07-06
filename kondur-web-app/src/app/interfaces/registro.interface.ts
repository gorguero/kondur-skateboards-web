export interface Registro{
    nombre: string,
    apellido: string,
    nickname: string,
    password: string,
    repeatPass: string,
    email: string,
    direcciones?: string[],
}