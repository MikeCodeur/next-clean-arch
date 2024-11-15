// 🐶 Importe le repo product
// 🤖
// import * as productRepository from '@/db/repositories/product-repository'

import {
  AddProduct,
  CreateEditProduct,
  DeleteProduct,
} from '@/types/product-types'

export async function createProductService(data: AddProduct) {
  // 🐶 Ajoute une règle simple : si email non defini, alors on lève un error
  //
  // 🤖
  // if (!data.title) {
  //   throw new Error('Un title est obligatoire pour créer un produit.')
  // }
  //
  // 🐶 Appelle 'createProductDao' depuis le repo
  // 🤖 return productRepository.createProductDao(data)
}

export async function getProductByNameService(name: string) {
  // 🐶 Implémente correctement en appelant le repo et ajoute des regles de validation simple si necessaire
}

export async function persistProductService(product: CreateEditProduct) {
  // 🐶 Implémente correctement en appelant le repo et ajoute des regles de validation simple si necessaire
}

export async function getProductsService() {
  // 🐶 Implémente correctement en appelant le repo et ajoute des regles de validation simple si necessaire
}

export async function getCategoriesService() {
  // 🐶 Implémente correctement en appelant le repo et ajoute des regles de validation simple si necessaire
}

export const deleteProductService = async (productParams: DeleteProduct) => {
  // 🐶 Implémente correctement en appelant le repo et ajoute des regles de validation simple si necessaire
}

export const getUserByEmailService = async (email: string) => {
  // 🐶 Implémente correctement en appelant le repo et ajoute des regles de validation simple si necessaire
}

export async function getProductsPaginationService(
  nbElement: number,
  start: number
) {
  // 🐶 Implémente correctement en appelant le repo et ajoute des regles de validation simple si necessaire
}
