import {createUserDao} from '@/db/repositories/user-repository'
// eslint-disable-next-line no-restricted-imports
import {UserAddModel} from '@/db/schema/users'
// eslint-disable-next-line no-restricted-imports
import {CreateEditProduct, DeleteProductModel} from '@/db/schema/products'

import {
  deleteProduct,
  getCategories,
  getProductByName,
  getProducts,
  getUserByEmail,
  persistProduct,
  getProductsPagination as getProductsPaginationDao,
} from '@/db/repositories/product-repository'

export async function createUser(newUser: UserAddModel) {
  return createUserDao(newUser)
}

export async function getProductByNameDao(name: string) {
  return getProductByName(name)
}

export async function persistProductDao(product: CreateEditProduct) {
  return persistProduct(product)
}

export async function getProductsDao() {
  return getProducts()
}

export async function getCategoriesDao() {
  return getCategories()
}

export const deleteProductDao = async (productParams: DeleteProductModel) => {
  await deleteProduct(productParams)
}

export const getUserByEmailDao = async (email: string) => {
  return getUserByEmail(email)
}

export async function getProductsPagination(nbElement: number, start: number) {
  return getProductsPaginationDao(nbElement, start)
}
