import {pgTable, text, uuid} from 'drizzle-orm/pg-core'
import {relations, sql} from 'drizzle-orm'
import {products} from './products'

export const categories = pgTable('category', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  name: text('name'),
})

export const categoriesRelations = relations(categories, ({many}) => ({
  products: many(products),
}))
export type CategoryModel = typeof categories.$inferSelect // return type when queried
export type AddCategoryModel = typeof categories.$inferInsert
