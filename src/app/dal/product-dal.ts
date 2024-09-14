import 'server-only'
import {cache} from 'react'

//import {auth} from '@/auth'

import {getProductsService} from '@/services/product-service'
import {Product, ProductDTO} from '@/services/types/domain/product-types'

export const getProducts = cache(async () => {
  //const session = await verifySession()
  // const session = await auth()
  // if (!session?.user || !session.user.email) return
  // console.log('getConnectedUser session.user', session.user)
  try {
    const products = await getProductsService()
    return productsDTO(products)
  } catch (error) {
    console.error('Failed to fetch user', error)
    return
  }
})

export function productDTO(product: Product): ProductDTO | undefined {
  if (!product) return undefined
  return {
    id: product?.id ?? '',
    title: product?.title ?? '',
    category: canSeeCategory() ? (product?.category ?? '') : '',
  }
}

export function productsDTO(products: Product[]): ProductDTO[] | undefined {
  if (!products || products.length === 0) return undefined

  return products
    .map((product) => productDTO(product))
    .filter(Boolean) as ProductDTO[]
}
function canSeeCategory() {
  return true
}
