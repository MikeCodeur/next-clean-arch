import 'server-only'

import {cache, experimental_taintUniqueValue as taintUniqueValue} from 'react'
import {redirect} from 'next/navigation'
import {RoleEnum, User, UserDTO} from '@/services/types/domain/user-types'
import {getUserByEmailService} from '@/services/user-service'
import {auth} from '@/services/authentication/auth'
import {isAuth, isAuthAdmin} from '@/services/authentication/auth-service'

export const getConnectedUser = cache(async () => {
  const session = await auth()
  if (!session?.user || !session.user.email) return
  console.log('getConnectedUser session.user', session.user)
  try {
    const user = await getUserByEmailService(session.user.email)
    return userDTO(user as User)
  } catch (error) {
    console.error('Failed to fetch user', error)
    return
  }
})

export const checkAuth = cache(async () => {
  const auth = await isAuth()
  console.log('checkAuth', auth)
  if (!auth) {
    redirect('/sign-in')
  }
})

export const checkAdmin = cache(async () => {
  const auth = await isAuthAdmin()
  if (!auth) {
    redirect('/restricted')
  }
})

export function userDTO(user: User): UserDTO | undefined {
  if (!user) return undefined
  taintUniqueValue(
    'Do not pass password to the client.',
    user,
    user?.password ?? '___'
  )
  // autre exemple
  // experimental_taintObjectReference(
  //   'Do not pass ALL environment variables to the client.',
  //   process.env
  // )
  return {
    email: user?.email ?? '',
    name: user?.name ?? '',
    role: (user?.role as RoleEnum) ?? RoleEnum.USER,
  }
}
