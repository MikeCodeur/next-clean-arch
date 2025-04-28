'use server'

import {signIn, signOut} from '@/auth'
import {LoginFormSchema, RoleEnum, SignInError, SignupFormSchema} from '@/type'

import {AuthError} from 'next-auth'
import {isRedirectError} from 'next/dist/client/components/redirect-error'
import {encrypt, hashPassword} from '@/crypt'

import {createUser, getUserByEmail} from '../exercices/data-lib'
import {AddUser} from '@/types/user-types'

export type FormState =
  | {
      errors?: {
        email?: string[]
        name?: string[]
        password?: string[]
        confirmPassword?: string[]
        role?: string[]
      }
      message?: string
    }
  | undefined

export async function register(
  _currentState: FormState,
  formData: FormData
): Promise<FormState> {
  console.log('register...')
  const email = formData.get('email') as string
  const name = formData.get('name') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  const parsedFields = SignupFormSchema.safeParse({
    email,
    name,
    password,
    confirmPassword,
  })
  logZodError(formData)
  if (!parsedFields.success) {
    return {
      errors: parsedFields.error.flatten().fieldErrors,
      message: 'Invalid fields.',
    }
  }
  try {
    await signUp(email, password, name)
    await signIn('credentials', formData)
  } catch (error) {
    //https://github.com/nextauthjs/next-auth/discussions/9389#discussioncomment-8046451
    if (isRedirectError(error)) {
      throw error
    }
    console.log('register error:', error)
    const signInError = error as SignInError
    if (error) {
      switch (signInError.type) {
        case 'CredentialsSignin': {
          return {message: 'Invalid credentials.'}
        }
        default: {
          return {message: `Something went wrong.${error}`}
        }
      }
    }
    throw error
  }
}
function logZodError(data: FormData) {
  const formData = Object.fromEntries(data)
  const parsed = SignupFormSchema.safeParse(formData)
  const errorMessages = parsed?.error?.errors
    .map((err) => `${err.path} ${err.message}`)
    .join(', ')
  console.error('Zod errorMessages', errorMessages)
}
export const signUp = async (email: string, password: string, name: string) => {
  const user = await getUserByEmail(email)
  if (user) {
    throw new Error('User already exists')
  }
  console.log('Signing up...', email, password)

  const hashedPassword = await hashPassword(password)
  const newUser: AddUser = {
    email,
    password: hashedPassword,
    name,
    role: RoleEnum.ADMIN,
    emailVerified: new Date(),
  }
  const token = await encrypt({
    userId: newUser.email ?? '',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  })
  const [userCreated] = await createUser(newUser) //await db.insert(users).values(newUser).returning()
  return {email: userCreated.email, role: userCreated.role}
}

export async function logout() {
  await signOut()
}

export async function authenticate(
  _currentState: FormState,
  formData: FormData
): Promise<FormState> {
  console.log('authenticate...')
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const parsedFields = LoginFormSchema.safeParse({
    email,
    password,
  })

  if (!parsedFields.success) {
    return {
      errors: parsedFields.error.flatten().fieldErrors,
      message: 'Invalid fields.',
    }
  }
  try {
    const user = await signIn('credentials', formData)
    console.log('Signed in:', user)
  } catch (error) {
    //https://github.com/nextauthjs/next-auth/discussions/9389#discussioncomment-8046451
    if (isRedirectError(error)) {
      //console.error('isRedirectError error:', error)
      throw error
    }
    const signInError = error as SignInError
    if (error instanceof AuthError) {
      return {message: `Authentication error.${error.cause?.err}`}
    }
    if (error) {
      switch (signInError.type) {
        case 'CredentialsSignin': {
          return {message: 'Invalid credentials.'}
        }
        default: {
          return {
            message: `Something went wrong.${signInError.message}`,
          }
        }
      }
    }
    throw error
  } finally {
    console.log('authenticate finally...')
  }
}
