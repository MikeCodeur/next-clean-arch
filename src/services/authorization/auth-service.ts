import {auth} from './auth'
//import {cache} from 'react'
import {hashPassword} from './crypt'
import {AddUser, User} from '@/types/user-types'

import {
  createUserDao,
  getUserByEmailDao,
} from '@/db/repositories/user-repository'
import {RoleEnum} from './type'

export const getSession = async () => {
  const session = await auth()
  return {session}
}
export const isAuth = async () => {
  const {session} = await getSession()
  return session ? true : false
}

export const getSessionUid = async () => {
  const authUser = await getAuthUser()
  return authUser?.id
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
export const roleHierarchy = [
  RoleEnum.GUEST,
  RoleEnum.USER,
  RoleEnum.REDACTOR,
  RoleEnum.MODERATOR,
  RoleEnum.MANAGER,
  RoleEnum.ADMIN,
  RoleEnum.SUPER_ADMIN,
]
export function hasRequiredRole(
  userConnected?: User,
  requestedRole?: RoleEnum
) {
  if (!userConnected || !requestedRole) {
    return false
  }
  // Définir l'ordre des privilèges

  const useRole = userConnected?.role ?? RoleEnum.USER
  const userRoleIndex = roleHierarchy.indexOf(useRole as RoleEnum)
  const requestedRoleIndex = roleHierarchy.indexOf(requestedRole)
  if (requestedRoleIndex === -1 || userRoleIndex === -1) {
    return false
  }
  //console.log(import {getConnectedUser} from '@/app/dal/user-dal'', useRole, requestedRole)
  if (userRoleIndex >= requestedRoleIndex) {
    return true
  }
  return false
}
