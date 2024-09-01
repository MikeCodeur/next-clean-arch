import {
  integer,
  jsonb,
  PgColumn,
  pgTable,
  PgTableWithColumns,
  primaryKey,
  serial,
  text,
  varchar,
} from 'drizzle-orm/pg-core'
import {relations} from 'drizzle-orm'

// User Group
export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: text('name'),
})

export const usersToGroups = pgTable(
  'users_to_groups',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    groupId: integer('group_id')
      .notNull()
      .references(() => groups.id),
  },
  (t) => ({
    pk: primaryKey({columns: [t.userId, t.groupId]}),
  })
)
export const groupsRelations = relations(groups, ({many}) => ({
  usersToGroups: many(usersToGroups),
  users: many(usersToGroups),
}))

export const usersToGroupsRelations = relations(usersToGroups, ({one}) => ({
  group: one(groups, {
    fields: [usersToGroups.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [usersToGroups.userId],
    references: [users.id],
  }),
}))

// USER
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
})

export const profileInfo = pgTable('profile_info', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  note: varchar('note', {length: 255}),
  metadata: jsonb('metadata'),
})

export const usersRelations = relations(users, ({one, many}) => ({
  profileInfo: one(profileInfo, {
    fields: [users.id],
    references: [profileInfo.userId],
  }),
  usersToGroups: many(usersToGroups),
  groups: many(usersToGroups),
}))

export const profileInfoRelations = relations(profileInfo, ({one}) => ({
  user: one(users, {
    fields: [profileInfo.userId],
    references: [users.id],
  }),
}))
