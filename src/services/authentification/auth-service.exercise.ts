import {auth} from './auth'
import {cache} from 'react'
import {hashPassword} from './crypt'
import {AddUser, User} from '@/types/user-types'
import {getUserByEmailDao} from '@/db/repositories/product-repository'
import {createUserDao} from '@/db/repositories/user-repository'
import {RoleEnum} from './type'

export const getSession = async () => {
  const session = await auth()
  return {session}
}

export const signUp = async (
  email: string,
  password: string,
  name: string
) => {}
