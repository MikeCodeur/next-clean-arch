import {isAuth, isAuthAdmin} from '@/services/authentification/auth-service'
import {redirect} from 'next/navigation'
import {cache} from 'react'

export const checkAuth = cache(async () => {
  const auth = await isAuth()
  console.log('checkAuth', auth)
  if (!auth) {
    redirect('/sign-in')
  }
})

export const checkAdmin = cache(async () => {
  const isAdmin = await isAuthAdmin()
  console.log('isadmin', isAdmin)
  if (!isAdmin) {
    redirect('/restricted')
  }
})
