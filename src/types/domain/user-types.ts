import {UserModel} from '@/db/schema/users'

export type User = UserModel
export type UserRoles = User['role']
//export type UserVisibility = User['visibility']
export type CreateUser = Pick<User, 'email' | 'name'>
export type UpdateUser = Omit<User, 'role' | 'emailVerified'>

export enum RoleEnum {
  USER = 'USER',
  GUEST = 'GUEST ',
  REDACTOR = 'REDACTOR',
  MODERATOR = 'MODERATOR ',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export type UserDTO = {
  email: string
  name?: string
  role?: RoleEnum
  password?: string
}
