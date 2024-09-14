import {
  CreateEditProduct,
  CreateProduct,
  DeleteProduct,
  UpdateProduct,
} from '@/services/types/domain/product-types'
import db from '@/db/schema'
import {products} from '../schema/products'
import {and, eq} from 'drizzle-orm'

export const createProductDao = async (productParams: CreateProduct) => {
  console.log('createProductDao product', productParams)
  const row = await db.insert(products).values(productParams).returning()
  return row[0]
}

export const updateProductDao = async (productParams: UpdateProduct) => {
  console.log('updateProductDao product', productParams)
  const row = await db
    .update(products)
    .set(productParams)
    .where(and(eq(products.id, productParams.id)))
    .returning()
  return row[0]
}

export const deleteProductDao = async (productParams: DeleteProduct) => {
  await db.delete(products).where(and(eq(products.id, productParams.id)))
}

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
