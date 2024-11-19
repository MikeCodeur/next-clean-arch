import withAuth, {withAuthManager} from '@/components/features/auth/withAuth'
import QuickProductForm from './quick-add-form'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {canMutateProduct} from '@/services/authorization/authorization-service'
import {cn} from '@/lib/utils'

async function Page() {
  const canMutate = await canMutateProduct()
  return (
    <div className="mx-auto w-full max-w-md">
      <Link href="/shop-admin/1" className={cn({hidden: !canMutate})}>
        <Button className="m-4">Ajout Détaillé</Button>
      </Link>
      <QuickProductForm></QuickProductForm>
    </div>
  )
}
export default withAuth(Page)
