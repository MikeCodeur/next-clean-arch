import {defineConfig} from 'cypress'
import {config} from 'dotenv'

config({path: '.env.test'})

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    env: {
      email: process.env.CYPRESS_EMAIL,
      password: process.env.CYPRESS_PASSWORD,
    },
  },
})
