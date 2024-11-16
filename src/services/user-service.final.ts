import * as userRepository from '@/db/repositories/user-repository'
import {AddUser} from '@/types/user-types'
import {
  canReadBankAccount,
  canReadOwn,
} from './authorization/authorization-service'

export const getBankAccountByUidService = async (uid: string) => {
  const canRead = canReadOwn(uid)
  if (!canRead) {
    throw new Error("Vous n'avez pas les droits pour lire ce compte bancaire.")
  }
  return userRepository.getBankAccountDao(uid)
}
export const getBankAccountByIdService = async (bankAccountId: string) => {
  const canRead = await canReadBankAccount(bankAccountId)
  if (!canRead) {
    throw new Error("Vous n'avez pas les droits pour lire ce compte bancaire.")
  }
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
