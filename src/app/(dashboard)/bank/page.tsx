import {BankStatement} from '@/components/bank-statement'
import {withAuthAdmin} from '@/components/features/auth/withAuth'
import {Label} from '@/components/ui/label'

import {getBankAccountByUidService} from '@/services/user-service'
import {getSessionUid} from '@/services/authentification/auth-service'
import {redirect} from 'next/navigation'

async function Page() {
  const uid = await getSessionUid()
  redirect(`/bank/${uid}`)
  return (
    <div>
      <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6">
        <Label>Your Account ...</Label>
      </div>
    </div>
  )
}
export default withAuthAdmin(Page)
