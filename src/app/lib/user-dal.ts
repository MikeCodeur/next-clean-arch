import 'server-only'
import {cache, experimental_taintUniqueValue as taintUniqueValue} from 'react'

//import {auth} from '@/auth'

import {RoleEnum, User, UserDTO} from '@/types/domain/user-types'
import {getUserByEmailService} from '@/services/user-service'

export const getConnectedUser = cache(async () => {
  //const session = await verifySession()
  // const session = await auth()
  // if (!session?.user || !session.user.email) return
  // console.log('getConnectedUser session.user', session.user)
  try {
    const user = await getUserByEmailService('admin@gmail.com')
    return userDTO(user as User)
  } catch (error) {
    console.error('Failed to fetch user', error)
    return
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
