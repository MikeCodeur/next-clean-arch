import withAuth from '@/components/features/auth/withAuth'
import QuickProductForm from './quick-add-form'

function Page() {
  return <QuickProductForm></QuickProductForm>
}
export default withAuth(Page)
