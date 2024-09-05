import {
  CreateAccount,
  CreateSession,
  CreateUser,
  User,
} from '@/types/domain/user-types'
import db from '../schema'
import {accounts, sessions, users} from '../schema/users'

export const getUserByIdDao = async (uid: string) => {
  const row = await db.query.users.findFirst({
    with: {
      profileInfo: true,
    },
    where: (user, {eq}) => eq(user.id, uid),
  })
  return row
}

export const getUserByEmailDao = async (email: string) => {
  const row = await db.query.users.findFirst({
    with: {
      profileInfo: true,
    },
    where: (user, {eq}) => eq(user.email, email),
  })
  return row
}

export const createUserDao = async (user: CreateUser) => {
  const row = await db.insert(users).values(user).returning()
  return row[0]
}

export const createUserAccountSessionDao = async (
  user: CreateUser,
  sessionToken: string
) => {
  const userCreated = await createUserDao(user)
  // const account = await createAccountDao({
  //   userId: userCreated.id,
  //   type: 'email',
  //   provider: 'email',
  //   providerAccountId: userCreated.email,
  // })
  // const session = createSessionDao({
  //   userId: userCreated.id,
  //   sessionToken,
  //   expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
  // })
}

export const createSessionDao = async (session: CreateSession) => {
  const row = await db.insert(sessions).values(session).returning()
  return row[0]
}

export const createAccountDao = async (account: CreateAccount) => {
  const row = await db.insert(accounts).values(account).returning()
  return row[0]
}
