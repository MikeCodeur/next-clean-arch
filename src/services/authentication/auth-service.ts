import {redirect} from 'next/navigation'
import {auth} from './auth'
import {AuthUser} from './type'
import {
  createUserDao,
  getUserByEmailDao,
  getUserByIdDao,
} from '@/db/repositories/user-repository'
import {hashPassword} from './crypt'
import {CreateUser, RoleEnum} from '@/types/domain/user-types'

export const checkAuth = async () => {
  const {session} = await getSession()
  console.log('checkAuth', session)
  if (!session) redirect('/sign-in')
}

export const getSession = async () => {
  const session = await auth()
  return {session}
}
export const getUserAuthExtented = async (): Promise<AuthUser | undefined> => {
  const session = await auth()
  if (!session?.user?.id) return
  const uid = session?.user?.id
  const user = await getUserByIdDao(uid)
  if (!user) return
  return {session, user, roles: [user?.role?.toLocaleLowerCase()] as string[]}
}

export const signUp = async (email: string, password: string) => {
  const user = await getUserByEmailDao(email)
  if (user) {
    throw new Error('User already exists')
  }
  console.log('Signing up...', email, password)

  const hashedPassword = await hashPassword(password)
  const newUser: CreateUser = {
    email,
    password: hashedPassword,
    name: 'John Doe',
    role: RoleEnum.SUPER_ADMIN,
  }
  const createdUser = await createUserDao(newUser)
  //await createSession(createdUser.id)
  return {email: createdUser.email, role: createdUser.role}
}
