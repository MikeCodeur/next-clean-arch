import {BankStatement} from '@/components/bank-statement'
import withAuth, {withAuthAdmin} from '@/components/features/auth/withAuth'
import {Label} from '@/components/ui/label'
import {checkAuth} from '../../shop-admin/utils'
import {getBankAccountByUidService} from '@/services/user-service'
import {canReadBankAccount} from '@/services/authorization/authorization-service'
import {notFound, redirect} from 'next/navigation'
import {AuthorizationError} from '@/lib/errors'

type Params = Promise<{uid: string}>

async function Page(props: {params: Params}) {
  await checkAuth()
  const params = await props.params
  const uid = params.uid
  let bankAccount
  try {
    bankAccount = await getBankAccountByUidService(uid)
  } catch {
    redirect('/restricted')
  }
  if (!bankAccount) {
    notFound()
  }
  return (
    <div>
      <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6">
        <Label>Your Account</Label>
      </div>
      <BankStatement bankAccount={bankAccount} />
    </div>
  )
}
export default withAuth(Page)
