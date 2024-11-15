import db from '../schema'
import {and, count, eq} from 'drizzle-orm'
import {
  AddProductModel,
  CreateEditProduct,
  DeleteProductModel,
  products,
} from '../schema/products'

// 🐶 Implémente un 'CRUD' dans le repository
export async function createProduct(newProduct: AddProductModel) {}

export async function getProductById(productId: string) {}

export async function updateProduct(
  productId: string,
  updatedData: AddProductModel
) {}

export const deleteProduct = async (productParams: DeleteProductModel) => {}

// 🐶 Implémente un 'les autres fonctions' dans le repository
export async function getProducts() {}

export async function getProductByName(name: string) {}

export async function persistProduct(product: CreateEditProduct) {}

export async function getCategories() {}

export const getUserByEmail = async (email: string) => {}

export async function getProductsPagination(nbElement: number, start: number) {}
