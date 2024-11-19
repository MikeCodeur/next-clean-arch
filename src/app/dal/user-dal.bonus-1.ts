import 'server-only'

import {cache} from 'react'
import {RoleEnum, UserDTO} from '@/services/authentification/type'
import {User} from '@/types/user-types'
import {getAuthUser} from '@/services/authentification/auth-service'
import {getPublicLastUsers} from '@/services/user-service'

export const getPublicLastUsersDal = cache(async () => {
  try {
    const lastUsers = await getPublicLastUsers()
    return usersDTO(lastUsers)
  } catch (error) {
    console.error('Failed to fetch user', error)
    return
  }
})

export function usersDTO(users?: User[]): UserDTO[] {
  if (!users || users.length === 0) return []

  return users
    .map((user) => userDTO(user)) // Appel de userDTO pour chaque utilisateur
    .filter((dto): dto is UserDTO => dto !== undefined) // Filtre les valeurs `undefined`
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
  return user ? `Hi ${user.name} (${user.role})` : 'Hi, Guest'
})

export function userDTO(user?: User): UserDTO | undefined {
  if (!user) return undefined

  return {
    email: user?.email ?? '',
    name: user?.name ?? '',
    role: (user?.role as RoleEnum) ?? RoleEnum.USER,
    image: user?.image ?? '',
    createdAt: user?.createdAt ?? '',
  }
}
