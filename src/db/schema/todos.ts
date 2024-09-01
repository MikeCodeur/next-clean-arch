import {timestamp, pgTable, serial, varchar, boolean} from 'drizzle-orm/pg-core'

export const todos = pgTable('todo', {
  id: serial('id').primaryKey(),
  title: varchar('title', {length: 255}),
  isCompleted: boolean('iscompleted').default(false),
  updatedAt: timestamp('updatedat').defaultNow(),
  createdAt: timestamp('createdat').defaultNow(),
})
export type Todo = typeof todos.$inferSelect // return type when queried
export type AddTodo = typeof todos.$inferInsert // input type when inserting
