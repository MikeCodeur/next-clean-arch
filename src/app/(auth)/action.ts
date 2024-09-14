'use server'

import {signIn, signOut} from '@/services/authentication/auth'
import {signUp} from '@/services/authentication/auth-service'
import {
  LoginFormSchema,
  SignInError,
  SignupFormSchema,
} from '@/services/authentication/type'

import {AuthError} from 'next-auth'
import {isRedirectError} from 'next/dist/client/components/redirect'

export type FormState =
  | {
      errors?: {
        email?: string[]
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
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  const parsedFields = SignupFormSchema.safeParse({
    email,
    password,
    confirmPassword,
  })

  if (!parsedFields.success) {
    return {
      errors: parsedFields.error.flatten().fieldErrors,
      message: 'Invalid fields.',
    }
  }
  try {
    await signUp(email, password, email)
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
    // const user = await getUserByEmailDao(email)
    // await createSessionDao({
    //   userId: user?.id ?? '',
    //   sessionToken: 'ok',
    //   expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    // })
  }
}
