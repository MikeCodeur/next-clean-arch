// import {drizzle} from 'drizzle-orm/node-postgres'
// import {drizzle as drizzleVercel} from 'drizzle-orm/vercel-postgres'

import postgres from 'postgres'
import {drizzle} from 'drizzle-orm/postgres-js'

import * as todos from './todos'
import * as users from './users'
import * as categories from './categories'
import * as products from './products'
import * as accounts from './accounts'

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL_LOCAL,
// })
// const poolVercel = createPool({
//   connectionString: process.env.POSTGRES_URL,
// })
//const connectionString = process.env.POSTGRES_URL
const pool = postgres(process.env.POSTGRES_URL ?? '', {max: 1})

// const dbPg = drizzle(pool, {
//   schema: {...todos, ...users, ...categories, ...products, ...accounts},
// })
// const dbVercel = drizzleVercel(poolVercel, {
//   schema: {...todos, ...users, ...categories, ...products, ...accounts},
// })

const db = drizzle(pool, {
  schema: {...todos, ...users, ...categories, ...products, ...accounts},
})

// const isVercel = true
// const db = isVercel ? dbVercel : dbPg
export default db
