import {sql} from 'drizzle-orm'
import {timestamp, pgTable, varchar, boolean, uuid} from 'drizzle-orm/pg-core'

export const todos = pgTable('todo', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  title: varchar('title', {length: 255}),
  isCompleted: boolean('iscompleted').default(false),
  updatedAt: timestamp('updatedat').defaultNow(),
  createdAt: timestamp('createdat').defaultNow(),
})
export type TodoModel = typeof todos.$inferSelect // return type when queried
export type AddTodoModel = typeof todos.$inferInsert // input type when inserting
