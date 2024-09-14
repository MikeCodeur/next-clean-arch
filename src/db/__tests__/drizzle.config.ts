import {defineConfig} from 'drizzle-kit'
import dotenv from 'dotenv'
dotenv.config({path: 'env.test'})
console.log(
  'drizzle.config.ts process.env.POSTGRES_URL',
  process.env.POSTGRES_URL
)

export default defineConfig({
  schema: './src/db/schema/*',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL as string,
  },
  verbose: true,
  strict: true,
  introspect: {
    casing: 'camel',
  },
})
