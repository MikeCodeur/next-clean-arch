import {getConnectedUser} from '@/app/exercices/auth-util'
import Logout from '@/components/features/auth/form/logout-form'

import {redirect} from 'next/navigation'

async function Page() {
  const user = await getConnectedUser()
  if (user) {
    redirect('/dashboard')
  }
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Logout />
    </div>
  )
}

export default Page
