import {CategoryModel} from '@/db/schema/categories'
import {
  ProductModel,
  AddProductModel,
  DeleteProductModel,
  CreateEditProduct as CreateEditProductModel,
  ProductWithCategory as ProductWithCategoryModel,
} from '@/db/schema/products'

export type Product = ProductModel
export type AddProduct = AddProductModel
export type DeleteProduct = DeleteProductModel
export type UpdateProduct = Partial<Product> & {id: Product['id']}
export type CreateEditProduct = CreateEditProductModel
export type ProductWithCategory = ProductWithCategoryModel
export type Category = CategoryModel
