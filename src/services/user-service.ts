import * as userRepository from '@/db/repositories/user-repository'
import {AddUser, UpdateUser} from '@/types/user-types'

export async function createUserService(data: AddUser) {
  if (!data.email) {
    throw new Error('Un email est obligatoire pour créer un utilisateur.')
  }
  return userRepository.createUserDao(data)
}
