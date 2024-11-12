import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import {relations, sql} from 'drizzle-orm'
import type {AdapterAccountType} from 'next-auth/adapters'
export const roleEnum = pgEnum('roles', [
  'USER',
  'GUEST',
  'REDACTOR',
  'MODERATOR',
  'ADMIN',
  'SUPER_ADMIN',
])

export const users = pgTable('user', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  email: text('email'),
  name: text('name'),
  emailVerified: timestamp('emailverified', {mode: 'date'}),
  role: roleEnum('role').notNull(),
  password: text('password'),
  image: text('image'),
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

export const accounts = pgTable(
  'account',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, {onDelete: 'cascade'}),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, {onDelete: 'cascade'}),
  expires: timestamp('expires', {mode: 'date'}).notNull(),
})

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', {mode: 'date'}).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)

export const authenticators = pgTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, {onDelete: 'cascade'}),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)

export type UserModel = typeof users.$inferSelect
export type UserAddModel = typeof users.$inferInsert

export type SessionModel = typeof sessions.$inferSelect
export type SessionAddModel = typeof sessions.$inferInsert

export type AccountModel = typeof accounts.$inferSelect
export type AccountAddModel = typeof accounts.$inferInsert
