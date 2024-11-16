import * as userRepository from '@/db/repositories/user-repository'
import {AddUser} from '@/types/user-types'

export const getBankAccountByUidService = async (uid: string) => {
  return userRepository.getBankAccountDao(uid)
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
