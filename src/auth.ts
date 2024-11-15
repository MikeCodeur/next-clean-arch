import NextAuth from 'next-auth'
import type {NextAuthConfig} from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'

import {DrizzleAdapter} from '@auth/drizzle-adapter'
import db from '@/db/schema'
import {verifyPassword} from './crypt'
import {getUserByEmailDao} from './app/exercices/data-lib'

export const {handlers, signIn, signOut, auth} = NextAuth({
  callbacks: {},
  providers: [
    Google,
    Resend,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await getUserByEmailDao(credentials.email as string)
        if (!user) {
          throw new Error('User not found.')
        }
        const passwordMatch = await verifyPassword(
          credentials.password as string,
          user?.password as string
        )
        console.log('authorize passwordMatch', passwordMatch)

        if (!passwordMatch) {
          throw new Error('Password incorrect.')
        }

        return user
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  adapter: DrizzleAdapter(db),
} satisfies NextAuthConfig)
