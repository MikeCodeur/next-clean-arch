import serviceInterceptor from '../interceptors/product-service-logger-interceptor'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const notImplemented = (arg1?: any, arg2?: any): any => {
  console.log('not implemented')
  return {products: []}
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const notImplementedCat = (arg1?: any, arg2?: any): any => {
  console.log('not implemented')
  return []
}

export const createProductWithCategoryService = notImplemented
export const getProductsService = notImplemented
export const createProductService = notImplemented
export const updateProductService = notImplemented
export const deleteProductService = notImplemented
export const persistProductService = notImplemented
export const getCategoriesService = notImplementedCat
export const getProductByNameService = notImplemented
export const getProductsPaginationService = notImplemented
