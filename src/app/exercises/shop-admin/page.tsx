import {getProducts} from './actions'
import {ProductsManagement} from './products-management'

export default async function Page() {
  const products = await getProducts()
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Administration de la boutique
      </h1>
      <ProductsManagement products={products ?? []} />
    </div>
  )
}
