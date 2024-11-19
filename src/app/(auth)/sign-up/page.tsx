import {getConnectedUser} from '@/app/dal/user-dal'
import RegisterForm from '@/components/features/auth/form/register-form'

import {redirect} from 'next/navigation'

export default async function Page() {
  const user = await getConnectedUser()
  if (user) {
    redirect('/logout')
  }
  return (
    <div className="grid h-full items-center justify-center p-4 text-center">
      <RegisterForm></RegisterForm>
    </div>
  )
}
