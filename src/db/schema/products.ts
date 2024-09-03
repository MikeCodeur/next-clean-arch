import {
  date,
  pgTable,
  varchar,
  real,
  text,
  integer,
  uuid,
} from 'drizzle-orm/pg-core'

import {categories, Category} from './categories'
import {relations, sql} from 'drizzle-orm'

export const products = pgTable('product', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  title: varchar('title', {length: 256}),
  price: real('price'),
  description: text('description'),
  image: varchar('image', {length: 256}),
  category: uuid('category_id').references(() => categories.id, {
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

export type ProductModel = typeof products.$inferSelect // return type when queried
export type CreateEditProductModel = typeof products.$inferInsert // return type when queried

export type ProductWithCategory = ProductModel & {
  category: Category | null | number
}
