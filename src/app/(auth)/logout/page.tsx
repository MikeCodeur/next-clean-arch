import Logout from '@/components/features/auth/form/logout-form'
import withAuth from '@/components/features/auth/withAuth'

function Page() {
  return (
    <div className="mx-auto flex max-w-2xl justify-center p-6 text-lg">
      <Logout />
    </div>
  )
}

export default withAuth(Page)
