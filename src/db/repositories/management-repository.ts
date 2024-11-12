import {sql} from 'drizzle-orm'
import db from '../schema'
import {exec} from 'node:child_process'
import initDotEnv from '../scripts/env'

initDotEnv('test')

async function truncateTableIfExists(tableName: string) {
  console.log('tableName:', tableName)
  const tableExists = await db.execute(sql`
      SELECT EXISTS (
          SELECT 1 
          FROM information_schema.tables 
          WHERE table_name = ${tableName}
      );
  `)
  console.log('tableExists:', tableExists)
  if (tableExists[0].exists) {
    await db.execute(
      sql.raw(`TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`)
    )
  }
}

export async function truncateTables() {
  try {
    await truncateTableIfExists('profile_info')
    await truncateTableIfExists('accounts')
    await truncateTableIfExists('product')
    await truncateTableIfExists('category')
    await truncateTableIfExists('todo')
    await truncateTableIfExists('users')
    await truncateTableIfExists('groups')

    console.log('Tables truncated successfully')
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Failed to truncate tables: ${error.message}`)
    } else {
      console.error('Failed to truncate tables: Unknown error')
    }
    throw error
  }
}

export async function initDrizzle() {
  if (process.env.NODE_ENV !== 'production') {
    await generateDb()
    await migrateDb()
  }
  await truncateTables()
}

const generateDb = async () => {
  try {
    console.log('⏳ Running drizzle-kit generate...')

    await runCommand(
      `dotenv -e .env.test -- pnpm exec drizzle-kit generate --config='./src/db/__tests__/drizzle.config.ts'`
    )
    console.log('✅ drizzle-kit generate completed!')
  } catch (error: unknown) {
    console.error(`❌ Failed to run drizzle-kit generate ${error}`)
  }
}

const migrateDb = async () => {
  try {
    console.log('⏳ Running drizzle-kit generate...')
    // Définir NODE_ENV sur 'test'
    // penser a : CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    await db.execute(sql.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`))
    await runCommand(
      `pnpm exec drizzle-kit migrate --config='./src/db/__tests__/drizzle.config.ts'`
    )
    console.log('✅ drizzle-kit migrate completed!')
  } catch (error: unknown) {
    console.error(`❌ Failed to run drizzle-kit migrate${error}`)
  }
}

// Fonction pour exécuter une commande shell
const runCommand = (command: string) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error executing command: ${error.message}`)
        reject(error)
      }
      if (stderr) {
        console.error(`⚠️ stderr: ${stderr}`)
      }
      console.log(`✅ stdout: ${stdout}`)
      resolve(stdout)
    })
  })
}
