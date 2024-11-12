import {auth} from './auth'
import {AuthUser} from './type'
import {
  createUserAccountSessionDao,
  getUserByEmailDao,
} from '@/db/repositories/user-repository'
import {encrypt, hashPassword} from './crypt'
import {CreateUser, RoleEnum, User} from '@/services/types/domain/user-types'
import {
  checkRoleHierarchy,
  hasRole,
} from '../authorization/authorization-service'

export const isAuth = async () => {
  const {session} = await getSession()
  return session ? true : false
}

export const isAuthAdmin = async () => {
  const authUser = await getUserAuthExtented()
  console.log('isAuthAdmin authUser', authUser)
  return checkRoleHierarchy(authUser?.user as User, RoleEnum.ADMIN)
}

export const checkAuthRole = async (role: RoleEnum) => {
  const authUser = await getUserAuthExtented()
  return hasRole(role, authUser)
}

export const getSession = async () => {
  const session = await auth()
  return {session}
}

export const getUserAuthExtented = async (): Promise<AuthUser | undefined> => {
  const session = await auth()
  console.log('getUserAuthExtented session.user', session?.user)
  if (!session?.user?.email) return
  const email = session?.user?.email ?? ''
  const user = await getUserByEmailDao(email)
  if (!user) return
  return {session, user, role: user?.role?.toLocaleUpperCase() as string}
}

export const signUp = async (email: string, password: string, name: string) => {
  const user = await getUserByEmailDao(email)
  if (user) {
    throw new Error('User already exists')
  }
  console.log('Signing up...', email, password)

  const hashedPassword = await hashPassword(password)
  const newUser: CreateUser = {
    email,
    password: hashedPassword,
    name,
    role: RoleEnum.ADMIN,
    emailVerified: new Date(),
  }
  const token = await encrypt({
    userId: newUser.email ?? '',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  })
  const createdUser = await createUserAccountSessionDao(newUser, token)
  //await createSession(createdUser.id)
  return {email: createdUser.user.email, role: createdUser.user.role}
}
