import 'server-only'

import {cache, experimental_taintUniqueValue as taintUniqueValue} from 'react'
import {redirect} from 'next/navigation'
import {RoleEnum, UserDTO} from '@/services/authentification/type'
import {User} from '@/types/user-types'
import {auth} from '@/services/authentification/auth'
import {getAuthUser} from '@/services/authentification/auth-service'

export const getConnectedUser = cache(async () => {
  try {
    const user = await getAuthUser()
    console.log('getConnectedUser', user)
    // 🐶 ne retourne pas le user de la BDD mais le DTO
    return user
  } catch (error) {
    console.error('Failed to fetch user', error)
    return
  }
})

export function userDTO(user: User) {
  // 🐶 retourne un userDTO en ne prenant que le nom / email / role
}

export const getConnectedUserLabel = cache(async () => {
  const user = await getConnectedUser()
  return getUserLabel(user)
})

export const getUserLabel = cache(async (user?: User) => {
  return user ? `Hi ${user.name} (${user.role})` : 'Hi, Guest'
})
