import {serviceInterceptor} from '../interceptors/service-logger-interceptor'

export const getProductsService = serviceInterceptor.getProductsService
export const createProductService = serviceInterceptor.createProductService
export const updateProductService = serviceInterceptor.updateProductService
export const deleteProductService = serviceInterceptor.deleteProductService
export const persistProductService = serviceInterceptor.persistProductService
export const getCategoriesService = serviceInterceptor.getCategoriesService
export const getProductByNameService =
  serviceInterceptor.getProductByNameService
