import {BankStatement} from '@/components/bank-statement'
import withAuth from '@/components/features/auth/withAuth'
import {Label} from '@/components/ui/label'
import {getBankAccountByUidService} from '@/services/user-service'
import {notFound} from 'next/navigation'

type Params = Promise<{uid: string}>

async function Page(props: {params: Params}) {
  const params = await props.params

  const uid = params.uid

  // 🐶 Wrappe cet appel dans un try catch pour catcher l'error d'authorisation
  const bankAccount = await getBankAccountByUidService(uid)
  // 🐶 Si le compte bancaire n'existe pas, redirige vers une page 404 avec notFound()
  // 🐶 En cas d'erreur redirige vers '/restricted'
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
