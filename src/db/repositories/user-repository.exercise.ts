import {and, eq} from 'drizzle-orm'
import db from '../schema'
import {DeleteUserModel, UserAddModel, users} from '../schema/users'

// 🐶 Implémente toutes les fonctions necessaire (voir data-lib.ts)

export async function createUserDao(newUser: UserAddModel) {
  // 🐶 implemente cette fonction
}

export async function getUserDao(userId: string) {
  // 🐶 implemente cette fonction
}

export async function updateUserDao(userId: string, updatedData: UserAddModel) {
  // 🐶 implemente cette fonction
}

export const deleteUserDao = async (userParams: DeleteUserModel) => {
  // 🐶 implemente cette fonction
}
