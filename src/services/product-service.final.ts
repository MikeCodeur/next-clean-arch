import * as productRepository from '@/db/repositories/product-repository'
import {
  AddProduct,
  CreateEditProduct,
  DeleteProduct,
} from '@/types/product-types'

import {labelShema} from '@/services/validation/validation-service'

export async function createProductWithCategoryService(
  productName: string,
  categoryName: string
) {
  const parsed = labelShema.safeParse({label: productName})
  if (!parsed.success) {
    throw new Error(`${parsed.error.errors[0].message}`)
  }

  const category = await getOrCreateCategoryService(categoryName)
  const newProduct = {
    title: productName,
    category: category.id,
    createdAt: new Date().toISOString(),
    quantity: 0,
  }
  const product = await productRepository.createProductDao(newProduct)
  return product
}

export async function createProductService(data: AddProduct) {
  return productRepository.createProductDao(data)
}

export async function getOrCreateCategoryService(categoryName: string) {
  const parsed = labelShema.safeParse({label: categoryName})
  if (!parsed.success) {
    throw new Error(`${parsed.error.errors[0].message}`)
  }
  const existingCategory =
    await productRepository.getCategoryByNameDao(categoryName)
  if (existingCategory) {
    return existingCategory
  }
  const newCategory = await productRepository.createCategoryDao({
    name: categoryName,
  })
  return newCategory
}

export async function persistProductService(product: CreateEditProduct) {
  return productRepository.persistProductDao(product)
}

export const deleteProductService = async (productParams: DeleteProduct) => {
  await productRepository.deleteProductDao(productParams)
}

export async function getProductByNameService(name: string) {
  if (!name) {
    throw new Error('Un nom est obligatoire pour chercher un produit.')
  }
  return productRepository.getProductByNameDao(name)
}

export async function getProductsService() {
  return productRepository.getProductsDao()
}

export async function getCategoriesService() {
  return productRepository.getCategoriesDao()
}

export async function getProductsPaginationService(
  nbElement: number,
  start: number
) {
  return productRepository.getProductsPaginationDao(nbElement, start)
}
