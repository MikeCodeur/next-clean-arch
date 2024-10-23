import {RoleEnum, User, UserDTO} from '@/services/types/domain/user-types'
// import {getConnectedUser} from '../../app/dal/user-dal' PATTERN NON RESPECTER
import {AuthUser} from '../authentication/type'
import {getUserAuthExtented} from '../authentication/auth-service'

// ONLY ADMIN CAN CREATE PRODUCT
export const canCreateProduct = async () => {
  const userConnected = await getUserAuthExtented()
  if (!userConnected) return false
  const isAdmin = hasRoleAdmin(userConnected)
  return isAdmin
}

export const canReadProduct = async () => {
  return true
}

export const hasRoleAdmin = (authUser?: UserDTO | AuthUser): boolean => {
  return authUser?.role === RoleEnum.ADMIN || false
}

export const hasRole = (
  role: RoleEnum,
  authUser?: UserDTO | AuthUser
): boolean => {
  return authUser?.role === role || false
}

export function checkRoleHierarchy(
  userConnected: User,
  requestedRole: RoleEnum
) {
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
  if (requestedRoleIndex >= userRoleIndex) {
    return true
  }
  return false
}

// export const hasRoleAdmin = (authUser?: AuthUser): boolean => {
//   return authUser?.roles.includes('admin') || false
// }
