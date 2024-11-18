import * as userRepository from '@/db/repositories/user-repository'
import {AddUser} from '@/types/user-types'

export const getBankAccountByUidService = async (uid: string) => {
  // 🐶 utilise 'canReadOwn' pour vérifier l'accès a cette ressource
  return userRepository.getBankAccountByUidDao(uid)
}

export const getBankAccountByidService = async (bankAccountId: string) => {
  // 🐶 utilise 'canReadBankAccount' pour vérifier l'accès a cette ressource
  return userRepository.getBankAccountByIdDao(bankAccountId)
}

export async function createUserService(data: AddUser) {
  if (!data.email) {
    throw new Error('Un email est obligatoire pour créer un utilisateur.')
  }
  return userRepository.createUserDao(data)
}

export const getUserByEmailService = async (email: string) => {
  return userRepository.getUserByEmailDao(email)
}
