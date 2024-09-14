import React from 'react'

import {Label} from '@/components/ui/label'
import {WithAuthProps} from '@/services/authentication/type'
import {getConnectedUser} from '@/app/dal/user-dal'

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithAuthProps>
) => {
  console.log(`withAuth Component ${WrappedComponent.name} mounted`)
  return async function WithAuth(props: P) {
    const user = await getConnectedUser()
    console.log('withAuth user', user)
    if (!user) {
      return (
        <div className="mx-auto max-w-2xl p-6 text-center text-lg">
          <Label className="text-l mb-4">You are not connected</Label>
        </div>
      )
    }

    return <WrappedComponent {...props} user={user} />
  }
}

export default withAuth
