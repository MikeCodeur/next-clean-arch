import * as productRepository from '@/db/repositories/product-repository'
import {
  AddProduct,
  CreateEditProduct,
  DeleteProduct,
  UpdateProduct,
} from '@/types/product-types'

import {
  createEditProductSchema,
  labelShema,
} from '@/services/validation/validation-service'
import {
  canMutateProduct,
  canQuickAddProduct,
} from './authorization/authorization-service'
import {AuthorizationError} from '@/lib/errors'

export async function createProductWithCategoryService(
  productName: string,
  categoryName: string
) {
  console.info(
    `createProductWithCategoryService : params ${productName} ${categoryName}`
  )
  const canCreate = await canQuickAddProduct()
  if (!canCreate) {
    console.error(
      `createProductWithCategoryService : "Vous n'êtes pas autorisé à créer un produit"`
    )
    throw new AuthorizationError("Vous n'êtes pas autorisé à créer un produit")
  }
  const parsed = labelShema.safeParse({label: productName})
  if (!parsed.success) {
    console.error(
      `createProductWithCategoryService : ${parsed.error.errors[0].message}`
    )
    throw new Error(`${parsed.error.errors[0].message}`)
  }
  const sanitizedName = parsed.data.label
  const category = await getOrCreateCategoryService(categoryName)
  const newProduct = {
    title: sanitizedName,
    category: category.id,
    createdAt: new Date().toISOString(),
    quantity: 0,
  }
  const product = await productRepository.createProductDao(newProduct)
  console.info(`createProductWithCategoryService : product created ${product} `)
  return product
}

export async function createProductService(data: AddProduct) {
  console.info(`createProductService : params ${data} `)
  const canCreate = await canMutateProduct()
  if (!canCreate) {
    console.error(
      `createProductService : "Vous n'êtes pas autorisé à créer un produit"`
    )
    throw new AuthorizationError("Vous n'êtes pas autorisé à créer un produit")
  }
  const parsed = createEditProductSchema.safeParse(data)
  if (!parsed.success) {
    console.error(`createProductService : ${parsed.error.message}`)
    throw new Error(`Validation failed ${parsed.error.message}`)
  }
  const sanitizedData = parsed.data
  return productRepository.createProductDao(sanitizedData)
}

export async function updateProductService(data: UpdateProduct) {
  console.info(`updateProductService : params ${data} `)
  const canCreate = await canMutateProduct()
  if (!canCreate) {
    console.error(
      `updateProductService : "Vous n'êtes pas autorisé à créer un produit"`
    )
    throw new AuthorizationError("Vous n'êtes pas autorisé à créer un produit")
  }
  const parsed = createEditProductSchema.safeParse(data)
  if (!parsed.success) {
    console.error(`updateProductService : ${parsed.error.message}`)
    throw new Error(`Validation failed ${parsed.error.message}`)
  }
  const sanitizedData = parsed.data
  return productRepository.updateProductDao(data.id, sanitizedData)
}

export async function getOrCreateCategoryService(categoryName: string) {
  console.info(`getOrCreateCategoryService : params ${categoryName} `)
  const parsed = labelShema.safeParse({label: categoryName})
  if (!parsed.success) {
    console.error(`getOrCreateCategoryService : ${parsed.error.message}`)
    throw new Error(`${parsed.error.errors[0].message}`)
  }
  const sanitizedName = parsed.data.label
  const existingCategory =
    await productRepository.getCategoryByNameDao(sanitizedName)
  if (existingCategory) {
    return existingCategory
  }
  const newCategory = await productRepository.createCategoryDao({
    name: sanitizedName,
  })
  return newCategory
}

export async function persistProductService(product: CreateEditProduct) {
  console.info(`persistProductService : params ${product} `)
  const canCreate = await canMutateProduct()
  if (!canCreate) {
    console.error(
      `persistProductService : "Vous n'êtes pas autorisé à créer un produit"`
    )
    throw new AuthorizationError("Vous n'êtes pas autorisé à créer un produit")
  }
  const parsed = createEditProductSchema.safeParse(product)
  if (!parsed.success) {
    console.error(`persistProductService : ${parsed.error.message}`)
    throw new Error(`Validation failed ${parsed.error.message}`)
  }
  const sanitizedData = parsed.data
  return productRepository.persistProductDao(sanitizedData)
}

export const deleteProductService = async (productParams: DeleteProduct) => {
  console.info(`deleteProductService : params ${productParams} `)
  const canCreate = await canMutateProduct()
  if (!canCreate) {
    console.error(
      `deleteProductService : "Vous n'êtes pas autorisé à créer un produit"`
    )
    throw new AuthorizationError("Vous n'êtes pas autorisé à créer un produit")
  }
  await productRepository.deleteProductDao(productParams)
}

export async function getProductsService() {
  console.info(`getProductsService : params`)
  return productRepository.getProductsDao()
}

export async function getProductByNameService(name: string) {
  console.info(`getProductByNameService : params ${name}`)
  if (!name) {
    console.error(
      `getProductByNameService : "Vous n'êtes pas autorisé à créer un produit"`
    )
    throw new Error('Un nom est obligatoire pour chercher un produit.')
  }
  return productRepository.getProductByNameDao(name)
}

export async function getCategoriesService() {
  console.info(`getCategoriesService`)
  return productRepository.getCategoriesDao()
}

export async function getProductsPaginationService(
  nbElement: number,
  start: number
) {
  console.info(`getProductsPaginationService : params ${nbElement} ${start}`)
  return productRepository.getProductsPaginationDao(nbElement, start)
}
