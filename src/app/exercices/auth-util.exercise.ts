// 🐶 Supprime le commenctaire pour activer la regle ESLINT import repo
/* eslint-disable no-restricted-imports */
import {getUserByEmailDao} from '@/db/repositories/product-repository'
import {createUserDao} from '@/db/repositories/user-repository'
import {auth} from '@/services/authentification/auth'
import {hashPassword} from '@/services/authentification/crypt'
import {RoleEnum} from '@/services/authentification/type'
import {AddUser, User} from '@/types/user-types'
import {cache} from 'react'

// 🐶 deplace tout dans service/authentification/auth-service
export const getSession = async () => {
  const session = await auth()
  return {session}
}
export const isAuth = async () => {
  const {session} = await getSession()
  return session ? true : false
}

export const getAuthUser = async () => {
  const session = await auth()
  if (!session?.user?.email) return
  const email = session?.user?.email ?? ''
  const user = await getUserByEmailDao(email)
  return user
}

export const isAuthAdmin = async () => {
  const authUser = await getAuthUser()
  return hasRequiredRole(authUser as User, RoleEnum.ADMIN)
}

export const checkAuthRole = async (role: RoleEnum) => {
  const authUser = await getAuthUser()
  return hasRequiredRole(authUser, role)
}

export const signUp = async (email: string, password: string, name: string) => {
  const user = await getUserByEmailDao(email)
  if (user) {
    throw new Error('User already exists')
  }
  console.log('Signing up...', email, password)

  const hashedPassword = await hashPassword(password)
  const newUser: AddUser = {
    email,
    password: hashedPassword,
    name,
    role: RoleEnum.USER,
    emailVerified: new Date(),
  }
  const [userCreated] = await createUserDao(newUser)
  return {email: userCreated.email, role: userCreated.role}
}

export function hasRequiredRole(
  userConnected?: User,
  requestedRole?: RoleEnum
) {
  if (!userConnected || !requestedRole) {
    return false
  }
  // Définir l'ordre des privilèges
  const roleHierarchy = [
    RoleEnum.USER,
    RoleEnum.REDACTOR,
    RoleEnum.MODERATOR,
    RoleEnum.ADMIN,
    RoleEnum.SUPER_ADMIN,
  ]
  const useRole = userConnected?.role ?? RoleEnum.USER
  const userRoleIndex = roleHierarchy.indexOf(useRole as RoleEnum)
  const requestedRoleIndex = roleHierarchy.indexOf(requestedRole)
  console.log('checkRoleHierarchy', userRoleIndex, requestedRoleIndex)
  if (userRoleIndex >= requestedRoleIndex) {
    return true
  }
  return false
}

export const getConnectedUser = cache(async () => {
  const session = await auth()
  if (!session?.user || !session.user.email) return
  console.log('getConnectedUser session.user', session.user)
  try {
    const user = await getUserByEmailDao(session.user.email)
    return user
    // return userDTO(user as UserModel)
  } catch (error) {
    console.error('Failed to fetch user', error)
    return
  }
})

export const getConnectedUserLabel = cache(async () => {
  const user = await getConnectedUser()
  return getUserLabel(user)
})

export const getUserLabel = cache(async (user?: User) => {
  return user ? `Hi ${user.name} (${user.role})` : 'Hi, Guest'
})