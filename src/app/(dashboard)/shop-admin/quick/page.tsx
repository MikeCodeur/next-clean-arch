import {withAuthManager} from '@/components/features/auth/withAuth'
import QuickProductForm from './quick-add-form'

function Page() {
  return <QuickProductForm></QuickProductForm>
}
export default withAuthManager(Page)
