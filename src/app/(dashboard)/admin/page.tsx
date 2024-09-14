import {checkAdmin} from '@/app/dal/user-dal'

export default async function Page() {
  await checkAdmin()
  return (
    <div className="grid h-full items-center justify-center p-4 text-center">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Administration
        </h1>
      </div>
    </div>
  )
}
