import type {Session, User} from 'next-auth'

export enum RoleEnum {
  USER = 'USER',
  GUEST = 'GUEST',
  REDACTOR = 'REDACTOR',
  MODERATOR = 'MODERATOR',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export type UserDTO = {
  email: string
  name?: string
  role?: RoleEnum
  password?: string
}

export type WithAuthProps = {
  user: UserDTO
}

export type SessionPayload = {
  userId?: string | number //used for simple session
  sessionId?: string //used for multisession db
  expiresAt: Date
  role?: RoleEnum
}

export interface SignInError {
  type: 'CredentialsSignin'
  message?: string
}

export type AuthUser = {
  session: Session
  user?: User
  role: string
}
