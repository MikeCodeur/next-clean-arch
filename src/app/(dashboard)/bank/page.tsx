import {BankStatement} from '@/components/bank-statement'
import {withAuthAdmin} from '@/components/features/auth/withAuth'
import {Label} from '@/components/ui/label'

function Page() {
  return (
    <div>
      <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6">
        <Label>Your Account</Label>
      </div>
      <BankStatement />
    </div>
  )
}
export default withAuthAdmin(Page)
