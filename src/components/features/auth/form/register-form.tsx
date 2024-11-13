'use client'
import React, {useActionState} from 'react'
import {useFormStatus} from 'react-dom'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {register} from '@/app/(auth)/action'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export default function RegisterForm() {
  const [actionState, registerAction] = useActionState(register, {})
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Incription </CardTitle>
        <CardDescription>
          S&apos;inscrire dans l&apos;application via Next-Auth sign-up
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form action={registerAction}>
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
              type="text"
              name="name"
              placeholder="Name"
              required
              className="mb-4"
            />
            {actionState?.errors?.name && (
              <p className="text-sm text-red-500">{actionState.errors.name}</p>
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
            <Input
              type="password"
              name="confirmPassword"
              required
              className="mb-4"
              placeholder="Confirm Password"
            />
            {actionState?.errors?.confirmPassword && (
              <p className="text-sm text-red-500">
                {actionState.errors.confirmPassword}
              </p>
            )}
            <LoginButton />
            <div className="text-red-500">
              {actionState?.message && <p>{actionState?.message}</p>}
            </div>
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
    // <div>
    //   <h1 className="mb-4 text-center text-3xl font-bold">Register</h1>

    // </div>
  )
}
function LoginButton() {
  const {pending} = useFormStatus()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (pending) {
      event.preventDefault()
    }
  }

  return (
    <Button
      disabled={pending}
      type="submit"
      onClick={handleClick}
      className="w-full"
    >
      Register
    </Button>
  )
}
