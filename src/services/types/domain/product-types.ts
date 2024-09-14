import {CategoryModel} from '@/db/schema/categories'
import {CreateEditProductModel, ProductModel} from '@/db/schema/products'

export type Product = ProductModel
export type CreateEditProduct = Omit<CreateEditProductModel, 'category'> & {
  category?: string
}

export type CreateProduct = Omit<CreateEditProduct, 'id'>
export type UpdateProduct = Partial<CreateProduct> & Pick<Product, 'id'>
export type DeleteProduct = Pick<Product, 'id'>

export type ProductWithCategory = Product & {
  category: CategoryModel | null | number
}

export type ProductDTO = Pick<Product, 'id' | 'title' | 'category'>
