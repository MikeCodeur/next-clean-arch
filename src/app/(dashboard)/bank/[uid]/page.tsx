import {BankStatement} from '@/components/bank-statement'
import {withAuthAdmin} from '@/components/features/auth/withAuth'
import {Label} from '@/components/ui/label'
import {checkAuth} from '../../shop-admin/utils'
import {getBankAccountByUidService} from '@/services/user-service'
import {canReadBankAccount} from '@/services/authorization/authorization-service'
import {redirect} from 'next/navigation'

type Params = Promise<{uid: string}>

async function Page(props: {params: Params}) {
  await checkAuth()
  const params = await props.params
  const uid = params.uid

  const bankAccount = await getBankAccountByUidService(uid)
  console.log('bankAccount', bankAccount)
  const canRead = await canReadBankAccount(bankAccount?.id ?? '')
  if (!canRead) {
    redirect('/restricted')
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
export default withAuthAdmin(Page)
