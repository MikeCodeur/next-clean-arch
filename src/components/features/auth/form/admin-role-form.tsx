'use client'
import React from 'react'
import {useFormState as useActionState, useFormStatus} from 'react-dom'
import {changeUserRole} from '../actions'
import {Button} from '@/components/ui/button'

import {Input} from '@/components/ui/input'
import {RoleEnum} from '@/lib/type'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {cn} from '@/lib/utils'

//import {redirect} from 'next/navigation'

export default function AdminChangeRoleForm() {
  const [actionState, changeRoleAction] = useActionState(
    changeUserRole,
    // eslint-disable-next-line unicorn/no-useless-undefined
    undefined
  )

  const roles = Object.keys(RoleEnum).filter((key) => Number.isNaN(Number(key)))
  return (
    <div>
      <h1 className="mb-4  text-center text-3xl font-bold">
        Changer le role d&lsquo;un Utilisateur
      </h1>
      <form action={changeRoleAction}>
        <div className="mb-4">
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
          <Select name="role">
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {actionState?.errors?.role && (
            <p className="text-sm text-red-500">{actionState.errors.role}</p>
          )}
        </div>

        <div
          className={cn(
            {'text-red-500': actionState?.errors},
            {'text-green-500': !actionState?.errors}
          )}
        >
          {actionState?.message && <p>{actionState?.message}</p>}
        </div>
        <LoginButton />
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
      Change Other user Role
    </Button>
  )
}
