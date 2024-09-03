import {
  createProductDao,
  updateProductDao,
} from '@/db/repositories/product-repository'
import {CreateProduct, UpdateProduct} from '@/types/domain/product-types'
import {canCreateProduct} from './authorization-service'

export const createProductService = async (healthParams: CreateProduct) => {
  const permission = await canCreateProduct()
  if (!permission) {
    throw new Error("Vous n'êtes pas autorisé à effectuer cette action")
  }
  await createProductDao(healthParams)
}

export const updateProductService = async (healthParams: UpdateProduct) => {
  const permission = await canCreateProduct()
  if (!permission) {
    throw new Error("Vous n'êtes pas autorisé à effectuer cette action")
  }
  await updateProductDao(healthParams)
}
