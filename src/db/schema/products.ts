import {
  date,
  pgTable,
  serial,
  varchar,
  real,
  text,
  integer,
} from 'drizzle-orm/pg-core'

import {categories, Category} from './categories'
import {relations} from 'drizzle-orm'

export const products = pgTable('product', {
  id: serial('id').primaryKey(),
  title: varchar('title', {length: 256}),
  price: real('price'),
  description: text('description'),
  image: varchar('image', {length: 256}),
  category: integer('category_id').references(() => categories.id, {
    onDelete: 'cascade',
  }),
  quantity: integer('quantity'),
  createdAt: date('createdat'),
  updatedAt: date('updatedat'),
})

export const productsRelations = relations(products, ({one}) => ({
  category: one(categories, {
    fields: [products.category],
    references: [categories.id],
  }),
}))

export type Product = typeof products.$inferSelect // return type when queried
export type InsertProduct = typeof products.$inferInsert // return type when queried

export type ProductWithCategory = Product & {
  category: Category | null | number
}
