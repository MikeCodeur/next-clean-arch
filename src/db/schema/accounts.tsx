import {integer, pgTable, numeric, boolean, uuid} from 'drizzle-orm/pg-core'

import {relations, sql} from 'drizzle-orm'
import {users} from './users'

export const accounts = pgTable('accounts', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(), // Clé étrangère vers users
  balance: numeric('balance', {precision: 10, scale: 2})
    .default(sql`0`)
    .notNull(),
  blocked: boolean('blocked').default(false),
})

export const accountRelations = relations(accounts, ({one}) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))
export type Account = typeof accounts.$inferSelect // return type when queried
