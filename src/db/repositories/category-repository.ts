import db from '@/db/schema'
import {
  CreateCategory,
  DeleteCategory,
  UpdateCategory,
} from '@/services/types/domain/category-types'

import {and, eq} from 'drizzle-orm'
import {categories} from '../schema/categories'

export const createCategoryDao = async (params: CreateCategory) => {
  // logger.info('createCategoryDao product', params)
  const row = await db.insert(categories).values(params).returning()
  return row[0]
}

export const updateCategoryDao = async (params: UpdateCategory) => {
  console.log('updateCategoryDao', params)
  const row = await db
    .update(categories)
    .set(params)
    .where(and(eq(categories.id, params.id)))
    .returning()
  return row[0]
}

export const deleteProductDao = async (param: DeleteCategory) => {
  await db.delete(categories).where(and(eq(categories.id, param.id)))
}

export async function getCategoriesById(id: string) {
  const resultQuery = await db.query.categories.findMany({
    where: (categories, {eq}) => eq(categories.id, id),
    orderBy: (categories, {asc}) => [asc(categories.id)],
  })

  return resultQuery
}

export async function getCategoriesByNameDao(name: string) {
  const resultQuery = await db.query.categories.findMany({
    where: (categories, {eq}) => eq(categories.name, name),
    orderBy: (categories, {asc}) => [asc(categories.id)],
  })

  return resultQuery
}

export async function getCategoriesDao() {
  const resultQuery = await db.query.products.findMany({
    orderBy: (products, {desc}) => [desc(products.createdAt)],
    limit: 20,
  })

  return resultQuery
}
