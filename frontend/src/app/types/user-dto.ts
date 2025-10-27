export type Role = 'user' | 'admin'

export interface UserDto {
  id: number
  login: string
  role: Role
}