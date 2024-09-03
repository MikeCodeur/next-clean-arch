import {jsonb, pgEnum, pgTable, text, uuid, varchar} from 'drizzle-orm/pg-core'
import {relations, sql} from 'drizzle-orm'

export const roleEnum = pgEnum('roles', [
  'USER',
  'GUEST',
  'REDACTOR',
  'MODERATOR',
  'ADMIN',
  'SUPER_ADMIN',
])

export const users = pgTable('users', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  email: text('email'),
  name: text('name'),
  role: roleEnum('role').notNull(),
  password: text('password'),
})

export const profileInfo = pgTable('profile_info', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  note: varchar('note', {length: 255}),
  metadata: jsonb('metadata'),
})

export const usersRelations = relations(users, ({one}) => ({
  profileInfo: one(profileInfo, {
    fields: [users.id],
    references: [profileInfo.userId],
  }),
}))

export const profileInfoRelations = relations(profileInfo, ({one}) => ({
  user: one(users, {
    fields: [profileInfo.userId],
    references: [users.id],
  }),
}))

export type UserModel = typeof users.$inferSelect
