
export const typeUser = {
  admin: 'admin',
  usuario: 'usuario'
} as const

export type User = {
  userId: number,
  nome: string,
  email: string,
  senha: string,
  token: string,
  tipoUsuario: typeof typeUser[keyof typeof typeUser]
}


