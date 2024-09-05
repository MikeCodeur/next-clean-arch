import {RoleEnum, UserDTO} from '@/types/domain/user-types'
import {getConnectedUser} from '../../app/lib/user-dal'

// ONLY ADMIN CAN CREATE PRODUCT
export const canCreateProduct = async () => {
  const userConnected = await getConnectedUser()
  if (!userConnected) return false
  const isAdmin = hasRoleAdmin(userConnected)
  return isAdmin
}

export const canReadProduct = async () => {
  return true
}

export const hasRoleAdmin = (authUser?: UserDTO): boolean => {
  return authUser?.role === RoleEnum.ADMIN || false
}

// export const hasRoleAdmin = (authUser?: AuthUser): boolean => {
//   return authUser?.roles.includes('admin') || false
// }
