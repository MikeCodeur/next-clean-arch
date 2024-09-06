'use client'
import React, {useState} from 'react'
import {Button} from '@/components/ui/button'

import {useRouter} from 'next/navigation'
import {logout} from '@/app/(auth)/action'

export default function Logout() {
  return (
    <div className="">
      <h1 className="mb-4 text-center text-3xl font-bold">Déconnexion</h1>
      <LogoutButton />
    </div>
  )
}
function LogoutButton() {
  const [pending, setPending] = useState(false)
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
