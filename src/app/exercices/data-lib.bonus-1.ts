import {createUserDao} from '@/db/repositories/user-repository'

import {
  deleteProduct,
  getCategories,
  getProductByName,
  getProducts,
  getUserByEmail,
  persistProduct,
  getProductsPagination as getProductsPaginationDao,
} from '@/db/repositories/product-repository'
import {AddUser} from '@/types/user-types.bonus-1'
import {CreateEditProduct, DeleteProduct} from '@/types/product-types.bonus-1'

export async function createUser(newUser: AddUser) {
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

export const deleteProductDao = async (productParams: DeleteProduct) => {
  await deleteProduct(productParams)
}

export const getUserByEmailDao = async (email: string) => {
  return getUserByEmail(email)
}

export async function getProductsPagination(nbElement: number, start: number) {
  return getProductsPaginationDao(nbElement, start)
}
