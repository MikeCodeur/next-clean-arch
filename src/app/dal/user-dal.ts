import 'server-only'

import {cache} from 'react'
import {RoleEnum, UserDTO} from '@/services/authentification/type'
import {User} from '@/types/user-types'
import {
  getAuthUser,
  isAuth,
  isAuthAdmin,
} from '@/services/authentification/auth-service'
import {getPublicLastUsers} from '@/services/user-service'
import {isAuthUserAdmin} from '@/services/authorization/authorization-service'
import {redirect} from 'next/navigation'

export const checkAuth = cache(async () => {
  const auth = await isAuth()
  console.log('checkAuth', auth)
  if (!auth) {
    redirect('/sign-in')
  }
})

export const checkAdmin = cache(async () => {
  const isAdmin = await isAuthAdmin()
  console.log('isadmin', isAdmin)
  if (!isAdmin) {
    redirect('/restricted')
  }
})
export const getPublicLastUsersDal = cache(async () => {
  try {
    const lastUsers = await getPublicLastUsers()
    return await usersDTO(lastUsers)
  } catch (error) {
    console.error('Failed to fetch user', error)
    return
  }
})

export async function usersDTO(users?: User[]): Promise<UserDTO[]> {
  if (!users || users.length === 0) return []
  const dtos = await Promise.all(users.map((user) => userDTO(user)))
  return dtos.filter((dto): dto is UserDTO => dto !== undefined)
}

export const getConnectedUser = cache(async () => {
  try {
    const user = await getAuthUser()
    return userDTO(user)
  } catch (error) {
    console.error('Failed to fetch user', error)
    return
  }
})

export const getConnectedUserLabel = cache(async () => {
  const user = await getConnectedUser()
  return getUserLabel(user)
})

export const getUserLabel = cache(async (user?: UserDTO) => {
  if (!user) {
    return 'Hi, Guest'
  }

  const name = user.name ?? 'Guest'
  const role = user.role ? ` (${user.role})` : '' // N'ajoute rien si le rôle est `undefined`

  return `Hi ${name}${role}`
})

export async function userDTO(user?: User): Promise<UserDTO | undefined> {
  if (!user) return undefined
  const canSee = await canSeeRole()
  return {
    email: user?.email ?? '',
    name: user?.name ?? '',
    role: canSee ? ((user?.role as RoleEnum) ?? RoleEnum.USER) : undefined,
    image: user?.image ?? '',
    createdAt: user?.createdAt ?? '',
  }
}
export async function canSeeRole() {
  const canSee = await isAuthUserAdmin()
  return canSee
}
