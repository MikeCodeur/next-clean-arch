import RegisterForm from '@/components/features/auth/form/register-form'

export default function Page() {
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
