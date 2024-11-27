// 🐶 importe cache

import {getCategoriesService} from '@/services/facades/product-service-facade'

// 🐶utilise cache pour stocker les données en cache
export const getProductsDal = async () => {
  // 🐶 Appelle getProductsService
  // 🐶 protège  await checkAuth()
}
// 🐶utilise cache pour stocker les données en cache
export const getCategoriesDal = async () => {
  // 🐶 Appelle getCategoriesService
  return getCategoriesService()
  // 🐶 protège  await checkAuth()
}
