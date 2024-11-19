import {getConnectedUser} from '@/app/dal/user-dal'
import Logout from '@/components/features/auth/form/logout-form'

import {redirect} from 'next/navigation'

async function Page() {
  const user = await getConnectedUser()
  if (!user) {
    redirect('/sign-in')
  }
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Logout />
    </div>
  )
}

export default Page
