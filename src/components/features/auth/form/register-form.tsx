'use client'
import React, {useActionState} from 'react'
import {useFormStatus} from 'react-dom'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {register} from '@/app/(auth)/action'

export default function RegisterForm() {
  const [actionState, registerAction] = useActionState(register, {})
  return (
    <div>
      <h1 className="mb-4 text-center text-3xl font-bold">Register</h1>
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
          type="password"
          name="password"
          placeholder="Password"
          required
          className="mb-4"
        />
        {actionState?.errors?.password && (
          <p className="text-sm text-red-500">{actionState.errors.password}</p>
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
    <Button disabled={pending} type="submit" onClick={handleClick}>
      Register
    </Button>
  )
}
