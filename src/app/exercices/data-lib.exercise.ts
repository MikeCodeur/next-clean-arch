// 🐶 Déplace tout le code lié à l'ORM vers un repository pour cela :

// ⛏️ supprime la ligne ci-dessous pour reactiver la règle eslint sur les imports
/* eslint-disable no-restricted-imports */

// ⛏️ supprimme les imports de ORM (tu peux garder les types si necessaire ... `CreateEditProduct` etc ... )

import db from '@/db/schema'
import {
  CreateEditProduct,
  DeleteProductModel,
  products,
} from '@/db/schema/products'
import {UserAddModel, users} from '@/db/schema/users'
import {and, count, eq} from 'drizzle-orm'

// 🐶 Déplace 'createUser' dans le repository 'user-repository.ts' et appele la fonction ici
// 🤖 import {createUserDao} from '@/db/repositories/user-repository'
export async function createUser(newUser: UserAddModel) {
  // ⛏️ supprile la ligne ci-dessous
  return db.insert(users).values(newUser).returning()
  // 🐶 appelle la fonction du repository
  // 🤖 createUserDao()
}

// 🐶 Continue sur toutes les fonctions
export async function getProductByNameDao(name: string) {
  const resultQuery = await db.query.products.findMany({
    with: {
      category: true,
    },

    where: (products, {eq}) => eq(products.title, name),
    orderBy: (categories, {asc}) => [asc(categories.id)],
  })

  return resultQuery
}
export async function persistProductDao(product: CreateEditProduct) {
  console.log('persistProductDao product', product)
  const rows = await db
    .insert(products)
    .values(product)
    .onConflictDoUpdate({target: products.id, set: product})
  return rows
}
export async function getProductsDao() {
  const resultQuery = await db.query.products.findMany({
    with: {
      category: true,
    },
    orderBy: (products, {desc}) => [desc(products.createdAt)],
    limit: 20,
  })

  return resultQuery
}
export async function getCategoriesDao() {
  const resultQuery = await db.query.categories.findMany({})
  return resultQuery
}
export const deleteProductDao = async (productParams: DeleteProductModel) => {
  await db.delete(products).where(and(eq(products.id, productParams.id)))
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

export async function getProductsPagination(nbElement: number, start: number) {
  const resultQuery = await db.query.products.findMany({
    offset: start,
    limit: nbElement,
    with: {
      category: true,
    },
    orderBy: (product, {asc}) => [asc(product.id)],
  })

  const rows = await db.select({count: count()}).from(products)

  return {
    products: resultQuery,
    totalProducts: rows[0].count,
  }
}
