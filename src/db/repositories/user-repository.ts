import {and, eq} from 'drizzle-orm'
import db from '../schema'
import {DeleteUserModel, UserAddModel, users} from '../schema/users'
import {bankAccounts} from '../schema/accounts'

export async function createUserDao(newUser: UserAddModel) {
  return db.insert(users).values(newUser).returning()
}

export async function getUserDao(userId: string) {
  const product = await db.select().from(users).where(eq(users.id, userId))
  return product.length > 0 ? product[0] : undefined
}

export async function updateUserDao(userId: string, updatedData: UserAddModel) {
  const [updatedUser] = await db
    .update(users)
    .set(updatedData)
    .where(eq(users.id, userId))
    .returning()

  return updatedUser
}
export const deleteUserDao = async (userParams: DeleteUserModel) => {
  await db.delete(users).where(and(eq(users.id, userParams.id)))
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

export async function getBankAccountByIdDao(bankAccountId: string) {
  const ba = await db
    .select()
    .from(bankAccounts)
    .where(eq(bankAccounts.id, bankAccountId))
  return ba.length > 0 ? ba[0] : undefined
}

export const getBankAccountDao = async (uid: string) => {
  const row = await db.query.bankAccounts.findFirst({
    with: {
      user: true,
    },
    where: (user, {eq}) => eq(user.userId, uid),
  })
  return row
}
