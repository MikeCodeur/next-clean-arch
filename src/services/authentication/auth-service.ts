import {redirect} from 'next/navigation'
import {auth} from './auth'
import {AuthUser} from './type'
import {
  createUserAccountSessionDao,
  createUserDao,
  getUserByEmailDao,
  getUserByIdDao,
} from '@/db/repositories/user-repository'
import {encrypt, hashPassword} from './crypt'
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
