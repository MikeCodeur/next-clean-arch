import {withAuthRedactor} from '@/components/features/auth/withAuth'
import {Redactor} from '@/components/redactor'

function Page() {
  return <Redactor />
}
export default withAuthRedactor(Page)
