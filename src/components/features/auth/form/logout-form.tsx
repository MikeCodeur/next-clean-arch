'use client'
import React, {useState} from 'react'
import {Button} from '@/components/ui/button'

import {useRouter} from 'next/navigation'
import {logout} from '@/app/(auth)/action'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export default function Logout() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Déconnexion</CardTitle>
        <CardDescription>
          Se déconnecter de l&apos;application via Next-Auth Logout
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <LogoutButton />
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
function LogoutButton() {
  const [pending, setPending] = useState(false)
  const router = useRouter()

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setPending(true)
    await logout()
    setPending(false)
    router.push('/sign-in/')
  }

  return (
    <Button onClick={handleClick} disabled={pending}>
      Logout
    </Button>
  )
}
