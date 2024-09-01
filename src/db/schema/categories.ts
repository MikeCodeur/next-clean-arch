import {pgTable, serial, text} from 'drizzle-orm/pg-core'
import {relations} from 'drizzle-orm'
import {products} from './products'

export const categories = pgTable('category', {
  id: serial('id').primaryKey(),
  name: text('name'),
})

export const categoriesRelations = relations(categories, ({many}) => ({
  products: many(products),
}))
export type Category = typeof categories.$inferSelect // return type when queried
