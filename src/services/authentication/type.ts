import {RoleEnum} from '@/services/types/domain/user-types'
import type {Session, User} from 'next-auth'
import {z} from 'zod'

export enum SessionType {
  STATELESS = 'STATELESS',
  DATABASE = 'DATABASE',
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

export const LoginFormSchema = z.object({
  email: z.string().email({message: 'Please enter a valid email.'}),
  password: z.string().min(1, {message: 'Password field must not be empty.'}),
})

export const SignupFormSchema = z
  .object({
    email: z.string().email({message: 'Please enter a valid email.'}).trim(),
    password: z
      .string()
      .min(4, {message: 'Be at least 4 characters long'})
      .regex(/[A-Za-z]/, {message: 'Contain at least one letter.'})
      .regex(/\d/, {message: 'Contain at least one number.'})
      .trim(),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword
    },
    {
      message: 'Passwords must match!',
      path: ['confirmPassword'],
    }
  )

export const ChangeRoleSchema = z.object({
  role: z.nativeEnum(RoleEnum, {
    message: 'Role must be a valid RoleEnum value',
  }),
})
export const ChangeUserRoleSchema = z.object({
  email: z.string().email({message: 'Please enter a valid email.'}),
  role: z.nativeEnum(RoleEnum, {
    message: 'Role must be a valid RoleEnum value',
  }),
})
//export type FormSchemaType = z.infer<typeof SignupFormSchema>
