import {
  createProductDao,
  deleteProductDao,
  getCategoriesDao,
  getProductByNameDao,
  getProductsDao,
  persistProductDao,
  updateProductDao,
} from '@/db/repositories/product-repository'
import {
  CreateEditProduct,
  CreateProduct,
  DeleteProduct,
  UpdateProduct,
} from '@/services/types/domain/product-types'
import {
  canCreateProduct,
  canReadProduct,
} from './authorization/authorization-service'
import {createEditProductServiceSchema} from './validations/product-validation'
//import withInterceptor from './interceptor/service-logger-interceptor'

// export const getProductsService = withInterceptor(async () => {
//   const permission = await canReadProduct()
//   if (!permission) {
//     throw new Error("Vous n'êtes pas autorisé à effectuer cette action")
//   }
//   return await getProductsDao()
// }, 'getProductsService')

export const getProductsService = async () => {
  const permission = await canReadProduct()
  if (!permission) {
    throw new Error("Vous n'êtes pas autorisé à effectuer cette action")
  }
  return await getProductsDao()
}

export const getCategoriesService = async () => {
  const permission = await canReadProduct()
  if (!permission) {
    throw new Error("Vous n'êtes pas autorisé à effectuer cette action")
  }
  return await getCategoriesDao()
}

export const createProductService = async (product: CreateProduct) => {
  const permission = await canCreateProduct()
  if (!permission) {
    throw new Error("Vous n'êtes pas autorisé à effectuer cette action")
  }
  await createProductDao(product)
}

export const updateProductService = async (product: UpdateProduct) => {
  const permission = await canCreateProduct()
  if (!permission) {
    throw new Error("Vous n'êtes pas autorisé à effectuer cette action")
  }
  await updateProductDao(product)
}

export const deleteProductService = async (product: DeleteProduct) => {
  const permission = await canCreateProduct()
  if (!permission) {
    throw new Error("Vous n'êtes pas autorisé à effectuer cette action")
  }
  await deleteProductDao(product)
}

export const persistProductService = async (product: CreateEditProduct) => {
  const permission = await canCreateProduct()
  if (!permission) {
    throw new Error("Vous n'êtes pas autorisé à effectuer cette action")
  }
  const parsed = createEditProductServiceSchema.safeParse(product)
  if (!parsed.success) {
    console.error('Validation errors:', parsed.error.issues) // real loger
    throw new Error(`Validation failed ${parsed.error.message}`)
  }
  const validatedProduct = parsed.data
  await persistProductDao(validatedProduct)
}

export const getProductByNameService = async (name: string) => {
  const permission = await canReadProduct()
  if (!permission) {
    throw new Error("Vous n'êtes pas autorisé à effectuer cette action")
  }
  return await getProductByNameDao(name)
}
