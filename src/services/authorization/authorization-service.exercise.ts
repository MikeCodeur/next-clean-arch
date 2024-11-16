import {User} from '@/types/user-types'
import {getAuthUser, hasRequiredRole} from '../authentification/auth-service'
import {RoleEnum} from '../authentification/type'
import {getBankAccountByIdDao} from '@/db/repositories/user-repository'

export const canReadBankAccount = async (bankAccountId?: string) => {
  return false
}

export const canCreateProduct = async () => {
  return false
}

export const canReadProduct = async () => {
  return true
}
export const hasRoleAdmin = async (authUser: User) => {
  return hasRequiredRole(authUser as User, RoleEnum.ADMIN)
}
