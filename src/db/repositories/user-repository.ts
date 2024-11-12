import {
  CreateAccount,
  CreateSession,
  CreateUser,
  UpdateSession,
} from '@/services/types/domain/user-types'
import db from '../schema'
import {accounts, sessions, users} from '../schema/users'
import {and, eq} from 'drizzle-orm'

export const getUsersDao = async () => {
  const rows = await db.query.users.findMany({
    with: {
      profileInfo: true,
    },
  })
  return rows
}
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
  return await db.transaction(async (tx) => {
    try {
      // Crée l'utilisateur dans la transaction
      const [userCreated] = await tx.insert(users).values(user).returning()

      // Crée le compte associé à l'utilisateur

      const [accountCreated] = await tx
        .insert(accounts)
        .values({
          userId: userCreated.id,
          type: 'email',
          provider: 'email',
          providerAccountId: userCreated.email ?? '',
          access_token: sessionToken,
          expires_at: 10 * 24 * 60 * 60, // 10 jours
          refresh_token: sessionToken,
          scope: 'email',
          token_type: 'Bearer',
        })
        .returning()

      // Crée la session pour cet utilisateur
      const [session] = await tx
        .insert(sessions)
        .values({
          userId: userCreated?.id ?? '',
          sessionToken,
          expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 jours
        })
        .returning()

      // Retourne l'utilisateur, le compte et la session
      return {user: userCreated, accountCreated, session}
    } catch (error) {
      // Si une erreur survient, la transaction est automatiquement annulée
      console.error('Transaction error:', error)
      throw error
    }
  })
}

export const createSessionDao = async (session: CreateSession) => {
  const row = await db.insert(sessions).values(session).returning()
  return row[0]
}

export const updateSessionDao = async (session: UpdateSession) => {
  const row = await db
    .update(sessions)
    .set(session)
    .where(and(eq(sessions.userId, session.userId)))
    .returning()
  return row[0]
}

export const getSessionDao = async (uid: string) => {
  const resultQuery = await db.query.sessions.findMany({
    where: (session, {eq}) => eq(session.userId, uid),
  })
  return resultQuery
}

export const createAccountDao = async (account: CreateAccount) => {
  const row = await db.insert(accounts).values(account).returning()
  return row[0]
}
