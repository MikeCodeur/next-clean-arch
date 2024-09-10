import {sql} from 'drizzle-orm'
import db from '../schema'

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
    // Désactiver temporairement les contraintes de clé étrangère
    //await db.execute(sql`SET session_replication_role = 'replica';`)

    // Troncature des tables
    // await db.execute(
    //   sql`TRUNCATE TABLE users_to_groups RESTART IDENTITY CASCADE;`
    // )

    // Appels aux différentes tables
    await truncateTableIfExists('profile_info')
    await truncateTableIfExists('accounts')
    await truncateTableIfExists('product')
    await truncateTableIfExists('category')
    await truncateTableIfExists('todo')
    await truncateTableIfExists('users')
    await truncateTableIfExists('groups')

    // Réactiver les contraintes de clé étrangère
    // await db.execute(sql`SET session_replication_role = 'origin';`)

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
