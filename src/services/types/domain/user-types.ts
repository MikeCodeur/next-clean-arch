import {
  AccountAddModel,
  SessionAddModel,
  SessionModel,
  UserAddModel,
  UserModel,
} from '@/db/schema/users'

export type User = UserModel
export type UserRoles = User['role']
//export type UserVisibility = User['visibility']
export type CreateUser = Omit<UserAddModel, 'id'>
export type UpdateUser = Omit<User, 'role' | 'emailVerified'>

export type Session = SessionModel
export type Account = AccountAddModel

export type CreateSession = SessionAddModel
export type UpdateSession = Partial<Omit<SessionModel, 'userId'>> & {
  userId: string
}

export type CreateAccount = AccountAddModel

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
