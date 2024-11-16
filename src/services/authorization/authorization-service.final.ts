import {User} from '@/types/user-types'
import {getAuthUser, hasRequiredRole} from '../authentification/auth-service'
import {RoleEnum} from '../authentification/type'
import {getBankAccountByIdDao} from '@/db/repositories/user-repository'

export const canReadBankAccount = async (bankAccountId?: string) => {
  const authUser = await getAuthUser()
  if (!authUser || !bankAccountId) return false
  const isAdmin = hasRoleAdmin(authUser)
  const bAccount = await getBankAccountByIdDao(bankAccountId)
  const isOwner = bAccount?.userId === authUser.id
  return isAdmin || isOwner
}

export const canReadOwn = async (uid?: string) => {
  const authUser = await getAuthUser()
  if (!authUser || !uid) return false
  const isAdmin = hasRoleAdmin(authUser)
  const isOwner = uid === authUser.id
  return isAdmin || isOwner
}

export const canCreateProduct = async () => {
  const authUser = await getAuthUser()
  if (!authUser) return false
  const isAdmin = hasRoleAdmin(authUser)
  return isAdmin
}

export const canReadProduct = async () => {
  return true
}
export const hasRoleAdmin = async (authUser: User) => {
  return hasRequiredRole(authUser as User, RoleEnum.ADMIN)
}
