'use client'

import {useActionState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {quickAddProduct} from '../actions'

export default function ProductForm() {
  const [state, formAction, isPending] = useActionState(quickAddProduct, {})

  return (
    <Card className="mx-auto mt-8 w-full max-w-md">
      <CardHeader>
        <CardTitle>Ajout Rapide de produit</CardTitle>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productName">Nom du produit</Label>
            <Input id="productName" name="productName" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoryName">Categorie</Label>
            <Input id="categoryName" name="categoryName" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save'}
          </Button>
          {state && state.success && (
            <p className="text-center text-sm text-green-600">
              {state.message}
            </p>
          )}
          {state && !state.success && (
            <p className="text-center text-sm text-red-600">{state.message}</p>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}
