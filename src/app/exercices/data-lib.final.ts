import {AddUser} from '@/types/user-types'
import {CreateEditProduct, DeleteProduct} from '@/types/product-types'
import {createUserService} from '@/services/user-service'
import {
  deleteProductService,
  getCategoriesService,
  getProductByNameService,
  getProductsPaginationService,
  getProductsService,
  getUserByEmailService,
  persistProductService,
} from '@/services/product-service'

export async function createUser(newUser: AddUser) {
  return createUserService(newUser)
}

export async function getProductByName(name: string) {
  return getProductByNameService(name)
}

export async function persistProduct(product: CreateEditProduct) {
  return persistProductService(product)
}

export async function getProducts() {
  return getProductsService()
}

export async function getCategories() {
  return getCategoriesService()
}

export const deleteProduct = async (productParams: DeleteProduct) => {
  await deleteProductService(productParams)
}

export const getUserByEmail = async (email: string) => {
  return getUserByEmailService(email)
}

export async function getProductsPagination(nbElement: number, start: number) {
  return getProductsPaginationService(nbElement, start)
}
