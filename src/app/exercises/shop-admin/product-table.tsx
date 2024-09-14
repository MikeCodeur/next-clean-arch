'use client'
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table'
import {Button} from '@/components/ui/button'

import {JSX, SVGProps} from 'react'
import {Product} from '@/services/types/domain/product-types'
import {Category} from '@/services/types/domain/category-types'

export function ProductsTable({
  products,
  onSelectedChange,
  onDeleteProduct,
}: {
  products: Product[]
  onSelectedChange: (product: Product) => void
  onDeleteProduct: (product: Product) => void
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.title}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell>
              {typeof product.category === 'object' && product.category !== null
                ? (product.category as Category).name
                : product.category}
            </TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  onSelectedChange(product)
                }}
              >
                <PencilIcon className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                className="ml-2"
                size="icon"
                variant="outline"
                onClick={() => {
                  onDeleteProduct(product)
                }}
              >
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function PencilIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}

function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
