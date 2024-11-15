import {
  ProductModel,
  AddProductModel,
  DeleteProductModel,
  CreateEditProduct as CreateEditProductModel,
} from '@/db/schema/products'

export type Product = ProductModel
// 🐶 Crée les autres types

// 🤖 export type AddProduct = AddProductModel
// 🤖 export type DeleteProduct = DeleteProductModel
// 🤖 export type UpdateProduct = Partial<Product> & {id: Product['id']}
// 🤖 export type CreateEditProduct = CreateEditProductModel
// 🤖 export type export type ProductWithCategory = ProductWithCategoryModel
// 🤖 export type Category = CategoryModel
