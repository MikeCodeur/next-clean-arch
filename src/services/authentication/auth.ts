//import {getUserByEmailDao} from '@/db/repositories/user-repository'
import {RoleEnum} from '@/types/domain/user-types'
import NextAuth from 'next-auth'
import type {NextAuthConfig} from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'
//import {verifyPassword} from './crypt'
import {DrizzleAdapter} from '@auth/drizzle-adapter'
import db from '@/db/schema'
import {getUserByEmailDao} from '@/db/repositories/user-repository'
import {hashPassword, verifyPassword} from './crypt'
import {accounts, sessions, users, verificationTokens} from '@/db/schema/users'

console.log('process.env.NEXT_RUNTIME AUTH', process.env.NEXT_RUNTIME)

const protectedRoutes = new Set([
  '/exercises/dashboard',
  '/exercises/bank-account',
])
const publicRoutes = new Set(['/'])
const adminRoutes = new Set(['/admin'])
const redactorRoutes = new Set(['/redaction'])

export const {handlers, signIn, signOut, auth} = NextAuth({
  callbacks: {
    authorized: async ({auth, request: {nextUrl}}) => {
      // Logged in users are authenticated, otherwise redirect to login page
      console.log('authorized', auth)
      const hasSession = auth?.user?.email
      const path = nextUrl.pathname
      const isProtectedRoute = protectedRoutes.has(path)
      const isPublicRoute = publicRoutes.has(path)
      const isAdminRoute = adminRoutes.has(path)
      const isRedactorRoute = redactorRoutes.has(path)
      //prefere add ROLE to session than call BD in middleware
      const user = await getUserByEmailDao(auth?.user?.email as string)
      const role = user?.role

      if (isProtectedRoute && !hasSession) {
        return Response.redirect(new URL('/exercises/login', nextUrl))
      }
      //admin route
      if (
        isAdminRoute &&
        !role?.includes(RoleEnum.ADMIN) &&
        !role?.includes(RoleEnum.SUPER_ADMIN)
      ) {
        return Response.redirect(new URL('/restricted/', nextUrl))
      }
      // Redactor route
      if (
        isRedactorRoute &&
        !role?.includes(RoleEnum.ADMIN) &&
        !role?.includes(RoleEnum.SUPER_ADMIN) &&
        !role?.includes(RoleEnum.REDACTOR) &&
        !role?.includes(RoleEnum.MODERATOR)
      ) {
        return Response.redirect(new URL('/restricted/', nextUrl))
      }
      if (isPublicRoute && hasSession) {
        return Response.redirect(new URL('/exercises/auth', nextUrl))
      }
      return true
    },
  },
  providers: [
    Google,
    Resend,
    Credentials({
      authorize: async (credentials) => {
        const user = await getUserByEmailDao(credentials.email as string)

        const passwordMatch = await verifyPassword(
          credentials.password as string,
          user?.password as string
        )
        console.log('authorize passwordMatch', passwordMatch)
        if (!user) {
          throw new Error('User not found.')
        }
        if (!passwordMatch) {
          throw new Error('Password incorrect.')
        }
        return user
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  jwt: {},
  session: {
    strategy: 'database',
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
} satisfies NextAuthConfig)
