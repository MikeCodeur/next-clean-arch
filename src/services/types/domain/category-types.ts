import {AddCategoryModel, CategoryModel} from '@/db/schema/categories'

export type Category = CategoryModel
export type CreateCategory = AddCategoryModel
export type UpdateCategory = CategoryModel
export type DeleteCategory = Pick<Category, 'id'>
