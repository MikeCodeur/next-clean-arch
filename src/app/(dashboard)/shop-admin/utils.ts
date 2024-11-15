import {getUserByEmailDao} from '@/app/exercices/data-lib'
import {auth} from '@/auth'
//import {UserModel} from '@/db/schema/users'
import {RoleEnum} from '@/type'
import {User} from '@/types/user-types'
import {redirect} from 'next/navigation'
import {cache} from 'react'

export const getSession = async () => {
  const session = await auth()
  return {session}
}
export const isAuth = async () => {
  const {session} = await getSession()
  return session ? true : false
}

export const checkAuth = cache(async () => {
  const auth = await isAuth()
  console.log('checkAuth', auth)
  if (!auth) {
    redirect('/sign-in')
  }
})
export const isAuthAdmin = async () => {
  const session = await auth()
  if (!session?.user?.email) return
  const email = session?.user?.email ?? ''
  const user = await getUserByEmailDao(email)
  console.log('isAuthAdmin authUser', user)
  return hasRequiredRole(user as User, RoleEnum.ADMIN)
}
export const checkAdmin = cache(async () => {
  const isAdmin = await isAuthAdmin()
  console.log('isadmin', isAdmin)
  if (!isAdmin) {
    redirect('/restricted')
  }
})

export function hasRequiredRole(userConnected: User, requestedRole: RoleEnum) {
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
