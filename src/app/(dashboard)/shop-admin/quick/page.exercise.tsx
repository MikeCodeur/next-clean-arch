import withAuth, {withAuthManager} from '@/components/features/auth/withAuth'
import QuickProductForm from './quick-add-form'
import Link from 'next/link'
import {Button} from '@/components/ui/button'

function Page() {
  // 🐶 appelle 'canMutateProduct' du service autorisation
  // 🐶 utilise 'canMutateProduct' pour conditionner affichage du bouton ligne 52

  return (
    <div className="mx-auto w-full max-w-md">
      {/*  🐶 Conditionne affiche du Link / Button  */}
      <Link href="/shop-admin/1">
        <Button className="m-4">Ajout Détaillé</Button>
      </Link>
      <QuickProductForm></QuickProductForm>
    </div>
  )
}
export default withAuth(Page)
