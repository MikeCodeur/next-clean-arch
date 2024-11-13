import {DashBoard} from '@/components/dash-board'
import {checkAuth} from '../shop-admin/utils'
import withAuth from '@/components/features/auth/withAuth'

async function Page() {
  await checkAuth()
  return (
    <div className="grid h-full items-center justify-center p-4 text-center">
      <DashBoard />
    </div>
  )
}
export default withAuth(Page)
