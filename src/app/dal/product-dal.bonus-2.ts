import {
  getCategoriesService,
  getProductsService,
} from '@/services/facades/product-service-facade'
import {cache} from 'react'
import {checkAuth} from './user-dal'

export const getProductsDal = cache(async () => {
  await checkAuth()
  const products = await getProductsService()
  return products
})

export const getCategoriesDal = cache(async () => {
  await checkAuth()
  const products = await getCategoriesService()
  return products
})
