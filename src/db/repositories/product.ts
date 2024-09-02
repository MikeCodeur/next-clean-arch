import {CreateProduct, DeleteProduct, UpdateProduct} from '@/lib/product-types'
import db from '@/db/schema'
import {products} from '../schema/products'
import {and, eq} from 'drizzle-orm'

export const createProductDao = async (productParams: CreateProduct) => {
  const row = await db.insert(products).values(productParams)
  return row
}

export const updateProductDao = async (productParams: UpdateProduct) => {
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

export async function getProductByName(name: string) {
  const resultQuery = await db.query.products.findMany({
    with: {
      category: true,
    },

    where: (products, {eq}) => eq(products.title, name),
    orderBy: (categories, {asc}) => [asc(categories.id)],
  })

  return resultQuery
}

export async function persistProductDao(product: UpdateProduct) {
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
    //where: catId ? (categories, {eq}) => eq(categories.id, catId) : undefined,
    orderBy: (categories, {asc}) => [asc(categories.id)],
    limit: 20,
  })

  return resultQuery
}

export async function getCategoriesDao() {
  const resultQuery = await db.query.categories.findMany({
    // 🐶 Implémente la requête avec les caractéristiques suivantes :
    // - trié par id ascendant
  })
  return resultQuery
}
