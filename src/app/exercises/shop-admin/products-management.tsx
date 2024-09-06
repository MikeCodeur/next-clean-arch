'use client'
import {Button} from '@/components/ui/button'

import {CardTitle, CardHeader, CardContent, Card} from '@/components/ui/card'

import {JSX, SVGProps, useState} from 'react'

import ProductForm from './form'

import {ProductsTable} from './product-table'
import {deleteProduct as deleteProductAction} from './actions'
import {toast} from 'sonner'
import {
  Product,
  ProductWithCategory,
} from '@/services/types/domain/product-types'

export function ProductsManagement({products}: {products: Product[]}) {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()

  const handleSelectedProduct = (product: Product) => {
    setSelectedProduct(product)
  }
  const handleDeleteProduct = async (product: Product) => {
    setSelectedProduct(undefined)
    await deleteProductAction(product)
    toast('Product deleted')
  }
  return (
    <div className="flex flex-col ">
      <div className="mb-4 rounded-lg border shadow-sm">
        <Card>
          <CardHeader>
            <CardTitle>Product</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductForm product={selectedProduct as ProductWithCategory} />
          </CardContent>
          <div className="mb-4 ml-4 flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedProduct({title: 'NEW'} as Product)}
            >
              <AddIcon className="mr-2 h-4 w-4" />
              New Product
            </Button>
          </div>
        </Card>
      </div>

      <div className="rounded-lg border shadow-sm">
        <ProductsTable
          products={products}
          onSelectedChange={handleSelectedProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      </div>
    </div>
  )
}

function AddIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}
