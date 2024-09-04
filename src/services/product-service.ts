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
} from '@/types/domain/product-types'
import {canCreateProduct, canReadProduct} from './authorization-service'

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
  await persistProductDao(product)
}

export const getProductByNameService = async (name: string) => {
  const permission = await canReadProduct()
  if (!permission) {
    throw new Error("Vous n'êtes pas autorisé à effectuer cette action")
  }
  return await getProductByNameDao(name)
}
