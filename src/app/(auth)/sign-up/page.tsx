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
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          S&apos;inscrire
        </h1>
        <RegisterForm></RegisterForm>
      </div>
    </div>
  )
}
