import NextAuth from 'next-auth'
import type {NextAuthConfig} from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'

import {DrizzleAdapter} from '@auth/drizzle-adapter'
import db from '@/db/schema'
import {getUserByEmailDao} from '@/db/repositories/user-repository'
import {verifyPassword} from './crypt'
import {accounts, sessions, users, verificationTokens} from '@/db/schema/users'

console.log('process.env.NEXT_RUNTIME AUTH', process.env.NEXT_RUNTIME)

// const protectedRoutes = new Set([
//   '/exercises/dashboard',
//   '/exercises/bank-account',
// ])
// const publicRoutes = new Set(['/'])
// const adminRoutes = new Set(['/admin'])
// const redactorRoutes = new Set(['/redaction'])

export const {handlers, signIn, signOut, auth} = NextAuth({
  callbacks: {
    session: async ({session, token}) => {
      console.log('session', session)
      console.log('token', token)
      //session.user.id = token.sub
      return session
    },
    authorized: async ({auth, request: {nextUrl}}) => {
      // Logged in users are authenticated, otherwise redirect to login page
      console.log('authorized caallback', auth)
      return true
      // const hasSession = auth?.user?.email
      // const path = nextUrl.pathname
      // const isProtectedRoute = protectedRoutes.has(path)
      // const isPublicRoute = publicRoutes.has(path)
      // const isAdminRoute = adminRoutes.has(path)
      // const isRedactorRoute = redactorRoutes.has(path)
      // //prefere add ROLE to session than call BD in middleware
      // const user = await getUserByEmailDao(auth?.user?.email as string)
      // const role = user?.role

      // if (isProtectedRoute && !hasSession) {
      //   return Response.redirect(new URL('/exercises/login', nextUrl))
      // }
      // //admin route
      // if (
      //   isAdminRoute &&
      //   !role?.includes(RoleEnum.ADMIN) &&
      //   !role?.includes(RoleEnum.SUPER_ADMIN)
      // ) {
      //   return Response.redirect(new URL('/restricted/', nextUrl))
      // }
      // // Redactor route
      // if (
      //   isRedactorRoute &&
      //   !role?.includes(RoleEnum.ADMIN) &&
      //   !role?.includes(RoleEnum.SUPER_ADMIN) &&
      //   !role?.includes(RoleEnum.REDACTOR) &&
      //   !role?.includes(RoleEnum.MODERATOR)
      // ) {
      //   return Response.redirect(new URL('/restricted/', nextUrl))
      // }
      // if (isPublicRoute && hasSession) {
      //   return Response.redirect(new URL('/exercises/auth', nextUrl))
      // }
      // return true
    },
    // async redirect({url, baseUrl}) {
    //   //Allows relative callback URLs
    //   if (url.startsWith('/')) return `${baseUrl}${url}`
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url
    //   return baseUrl
    // },
  },
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
        // NOT REALLY USEDED
        // const session = await getSessionDao(user?.id)
        // const token = await encrypt({
        //   userId: user?.id ?? '',
        //   expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        // })
        // await (session
        //   ? updateSessionDao({
        //       userId: user.id,
        //       sessionToken: token,
        //       expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        //     })
        //   : createSessionDao({
        //       userId: user?.id,
        //       sessionToken: token,
        //       expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        //     }))
        // console.log('authorize user returned', user)
        return user
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  // jwt: {},
  session: {
    //https://stackoverflow.com/questions/78577647/auth-js-v5-database-session-strategy-for-credential-provider-returning-null/78955835#78955835
    strategy: 'jwt',
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
} satisfies NextAuthConfig)
