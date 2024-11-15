import {and, eq} from 'drizzle-orm'
import db from '../schema'
import {DeleteUserModel, UserAddModel, users} from '../schema/users'

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
