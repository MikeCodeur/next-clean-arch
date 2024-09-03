import {
  getUserByEmailDao,
  getUserByIdDao,
} from '@/db/repositories/user-repository'
import {getProducts} from './actions'
import {ProductsManagement} from './products-management'
import {getConnectedUser} from '@/services/dal'

export default async function Page() {
  const products = await getProducts()
  const userConnected = await getConnectedUser()
  console.log('userConnected', userConnected)
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Administration de la boutique
      </h1>
      <ProductsManagement products={products ?? []} />
    </div>
  )
}
