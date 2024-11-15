import * as productRepository from '@/db/repositories/product-repository'
import {
  AddProduct,
  CreateEditProduct,
  DeleteProduct,
} from '@/types/product-types'

export async function createProductService(data: AddProduct) {
  if (!data.title) {
    throw new Error('Un title est obligatoire pour créer un produit.')
  }
  return productRepository.createProductDao(data)
}
export async function getProductByNameService(name: string) {
  if (!name) {
    throw new Error('Un nom est obligatoire pour chercher un produit.')
  }
  return productRepository.getProductByNameDao(name)
}

export async function persistProductService(product: CreateEditProduct) {
  return productRepository.persistProductDao(product)
}

export async function getProductsService() {
  return productRepository.getProductsDao()
}

export async function getCategoriesService() {
  return productRepository.getCategoriesDao()
}

export const deleteProductService = async (productParams: DeleteProduct) => {
  await productRepository.deleteProductDao(productParams)
}

export const getUserByEmailService = async (email: string) => {
  return productRepository.getUserByEmailDao(email)
}

export async function getProductsPaginationService(
  nbElement: number,
  start: number
) {
  return productRepository.getProductsPaginationDao(nbElement, start)
}
