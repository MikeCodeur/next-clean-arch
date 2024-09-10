// import {drizzle} from 'drizzle-orm/node-postgres'
// import {drizzle as drizzleVercel} from 'drizzle-orm/vercel-postgres'

import postgres from 'postgres'
import {drizzle} from 'drizzle-orm/postgres-js'

import * as todos from './todos'
import * as users from './users'
import * as categories from './categories'
import * as products from './products'
import * as accounts from './accounts'

const bddUrl = process.env.POSTGRES_URL ?? ''
console.log('bddUrl:', bddUrl)
const pool = postgres(bddUrl, {max: 1})

const db = drizzle(pool, {
  schema: {...todos, ...users, ...categories, ...products, ...accounts},
})

export default db
