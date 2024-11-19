import {User} from '@/types/user-types'
import {getAuthUser, hasRequiredRole} from '../authentification/auth-service'
import {RoleEnum} from '../authentification/type'
import {getBankAccountByIdDao} from '@/db/repositories/user-repository'

//2. 🚀 Autorisation dans les Servers Action
export const canMutateProduct = async () => {
  const authUser = await getAuthUser()
  if (!authUser) return false
  return hasRoleAdmin(authUser)
}

export const canQuickAddProduct = async () => {
  const authUser = await getAuthUser()
  if (!authUser) return false
  console.log('canQuickAddProduct', authUser)
  return hasRequiredRole(authUser, RoleEnum.MANAGER)
}

export const canReadBankAccount = async (bankAccountId?: string) => {
  if (!bankAccountId) return false

  const bAccount = await getBankAccountByIdDao(bankAccountId)
  if (!bAccount) return false

  return await canReadOwn(bAccount.userId)
}

export const canReadOwn = async (resourceOwnerId?: string) => {
  if (!resourceOwnerId) return false

  const authUser = await getAuthUser()
  if (!authUser) return false

  return isAdminOrOwner(authUser, resourceOwnerId)
}

const isAdminOrOwner = (authUser: User, ownerId: string): boolean => {
  const isAdmin = hasRoleAdmin(authUser)
  const isOwner = authUser.id === ownerId
  return isAdmin || isOwner
}

export const hasRoleAdmin = (authUser: User) => {
  return hasRequiredRole(authUser as User, RoleEnum.ADMIN)
}
