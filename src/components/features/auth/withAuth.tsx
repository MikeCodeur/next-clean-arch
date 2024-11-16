import React from 'react'

import {UserModel} from '@/db/schema/users'
import {redirect} from 'next/navigation'

import {RoleEnum} from '@/services/authentification/type'
import {
  getConnectedUser,
  hasRequiredRole,
} from '@/services/authentification/auth-service'

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
    //console.log('withAuth user', user)
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
