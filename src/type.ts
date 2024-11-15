import {z} from 'zod'
import {RoleEnum} from './services/authentification/type'

export const LoginFormSchema = z.object({
  email: z.string().email({message: 'Please enter a valid email.'}),
  password: z.string().min(1, {message: 'Password field must not be empty.'}),
})

export const SignupFormSchema = z
  .object({
    email: z.string().email({message: 'Please enter a valid email.'}).trim(),
    name: z.string().min(4, {message: 'Be at least 4 characters long'}),
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
