import {and, count, eq} from 'drizzle-orm'
import db from '../schema'
import {
  AddProductModel,
  CreateEditProduct,
  DeleteProductModel,
  products,
} from '../schema/products'

// CRUD
export async function createProductDao(newProduct: AddProductModel) {
  const [createdProduct] = await db
    .insert(products)
    .values(newProduct)
    .returning()
  return createdProduct
}
export async function getProductByIdDao(productId: string) {
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
  return product.length > 0 ? product[0] : undefined
}

export async function updateProductDao(
  productId: string,
  updatedData: AddProductModel
) {
  const [updatedProduct] = await db
    .update(products)
    .set(updatedData)
    .where(eq(products.id, productId))
    .returning()

  return updatedProduct
}
export const deleteProductDao = async (productParams: DeleteProductModel) => {
  await db.delete(products).where(and(eq(products.id, productParams.id)))
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

// Extra CRUD
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

export async function getCategoriesDao() {
  const resultQuery = await db.query.categories.findMany({})
  return resultQuery
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

export async function getProductsPaginationDao(
  nbElement: number,
  start: number
) {
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