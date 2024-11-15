// 🐶 supprime le commentaire ci dessous pour reactiver la regle eslint
/* eslint-disable no-restricted-imports */
import {createUserDao} from '@/db/repositories/user-repository'

import {
  deleteProductDao,
  getCategoriesDao,
  getProductByNameDao,
  getProductsDao,
  getUserByEmailDao,
  persistProductDao,
  getProductsPaginationDao,
} from '@/db/repositories/product-repository'
import {AddUser} from '@/types/user-types'
import {CreateEditProduct, DeleteProduct} from '@/types/product-types'

// 🐶 importe
export async function createUser(newUser: AddUser) {
  return createUserDao(newUser)
}

export async function getProductByName(name: string) {
  return getProductByNameDao(name)
}

export async function persistProduct(product: CreateEditProduct) {
  return persistProductDao(product)
}

export async function getProducts() {
  return getProductsDao()
}

export async function getCategories() {
  return getCategoriesDao()
}

export const deleteProduct = async (productParams: DeleteProduct) => {
  await deleteProductDao(productParams)
}

export const getUserByEmail = async (email: string) => {
  return getUserByEmailDao(email)
}

export async function getProductsPagination(nbElement: number, start: number) {
  return getProductsPaginationDao(nbElement, start)
}
