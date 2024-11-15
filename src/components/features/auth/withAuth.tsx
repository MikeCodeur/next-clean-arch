import React from 'react'

import {Label} from '@/components/ui/label'
import {UserModel} from '@/db/schema/users'
import {getConnectedUser} from '@/app/(dashboard)/shop-admin/actions'
import {RoleEnum} from '@/type'
import {hasRequiredRole} from '@/app/(dashboard)/shop-admin/utils'
import {redirect} from 'next/navigation'

export type WithAuthProps = {
  user: UserModel
}
const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithAuthProps>,
  requiredRole?: RoleEnum
) => {
  //console.log(`withAuth Component ${WrappedComponent.name} mounted`)

  return async function WithAuth(props: P) {
    const user = await getConnectedUser()
    const hasRole = hasRequiredRole(
      user as UserModel,
      requiredRole ?? RoleEnum.GUEST
    )
    console.log('withAuth user', user)
    if (!user) {
      redirect('/sign-in')
    }
    if (!hasRole) {
      redirect(`/restricted?role=${requiredRole ?? ''}`)
    }

    return <WrappedComponent {...props} user={user} />
  }
}

export default withAuth

export const withAuthAdmin = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithAuthProps>
) => withAuth(WrappedComponent, RoleEnum.ADMIN)

export const withAuthModerator = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithAuthProps>
) => withAuth(WrappedComponent, RoleEnum.MODERATOR)

export const withAuthRedactor = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithAuthProps>
) => withAuth(WrappedComponent, RoleEnum.REDACTOR)
