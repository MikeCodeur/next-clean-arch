import {getUserByEmailDao} from '@/db/repositories/user-repository'
import {canReadProduct} from './authorization/authorization-service'

export const getUserByEmailService = async (name: string) => {
  const permission = await canReadProduct()
  if (!permission) {
    throw new Error("Vous n'êtes pas autorisé à effectuer cette action")
  }
  return await getUserByEmailDao(name)
}
