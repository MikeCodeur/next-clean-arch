#!/usr/bin/env node

import pg from 'pg'
import initDotEnv from './env'

initDotEnv()

const createTables = async () => {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL is not defined')
  }
  const client = new pg.Client({
    connectionString: process.env.POSTGRES_URL,
  })

  console.log('⏳ Checking connexion ...')
  console.log(`🗄️  URL : ${process.env.POSTGRES_URL}`)

  await client.connect()

  const start = Date.now()
  await client.query(` 
   CREATE TABLE Todo (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    isCompleted BOOLEAN NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
    `)

  const end = Date.now()

  console.log('✅ Tables created in', end - start, 'ms')

  process.exit(0)
}

export default createTables

try {
  await createTables()
} catch (error) {
  console.error('❌ Connexion failed')
  console.error(error)
  process.exit(1)
}
