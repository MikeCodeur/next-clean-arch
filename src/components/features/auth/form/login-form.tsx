'use client'
import React, {useActionState} from 'react'
import {useFormStatus} from 'react-dom'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {authenticate} from '@/app/(auth)/action'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export default function LoginForm() {
  const [actionState, authenticateAction] = useActionState(authenticate, {})
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Se connecter</CardTitle>
        <CardDescription>
          Se connecter de l&apos;application via Next-Auth login credential
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form action={authenticateAction}>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="mb-4"
            />
            {actionState?.errors?.email && (
              <p className="text-sm text-red-500">{actionState.errors.email}</p>
            )}
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="mb-4"
            />
            {actionState?.errors?.password && (
              <p className="text-sm text-red-500">
                {actionState.errors.password}
              </p>
            )}
            <div className="text-red-500">
              {actionState?.message && <p>{actionState.message}</p>}
            </div>
            <LoginButton />
          </form>
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
function LoginButton() {
  const {pending} = useFormStatus()

  return (
    <Button disabled={pending} type="submit" className="w-full">
      Login
    </Button>
  )
}
