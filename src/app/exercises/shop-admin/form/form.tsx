'use client'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select'

import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import React, {useActionState} from 'react'

import {getCategories, onSubmitAction} from '../actions'
import {toast} from 'sonner'

//import {CategoryModel} from '@/db/schema/categories' //todo import the category type
import {ProductWithCategory} from '@/services/types/domain/product-types'
import {
  createEditProductFormSchema,
  FormProductSchemaType,
} from '@/components/features/auth/validations/product-form-validation'
import {Category} from '@/services/types/domain/category-types'

export default function ProductForm({
  product,
}: {
  product?: ProductWithCategory
}) {
  const [state, formAction] = useActionState(onSubmitAction, {})
  const [categories, setCategories] = React.useState<Category[]>([])
  const [isPending, setIsPending] = React.useState(false)
  console.log('product form', product)

  const form = useForm<FormProductSchemaType>({
    resolver: zodResolver(createEditProductFormSchema),
    defaultValues: {
      id: product?.id ?? '',
      createdAt: product?.createdAt ?? new Date().toISOString(),
      quantity: product?.quantity ?? 0,
      category: product?.category?.id ?? undefined,
      title: product?.title ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
    },
  })

  React.useEffect(() => {
    if (state?.success === true) {
      toast.success('Product saved')
      form.reset({
        id: '',
        createdAt: new Date().toISOString(),
        quantity: 10,
        category: undefined,
        title: '',
        description: '',
        price: 0,
      })
    } else if (state?.success === false) {
      //set rhf errors form the server errors
      for (const error of state?.errors ?? []) {
        form.setError(error.field, {type: 'manual', message: error.message})
      }

      toast.error(state.message ?? 'Error')
    }
    setIsPending(false)
  }, [form, state, state?.success])

  React.useEffect(() => {
    form.reset({
      id: product?.id ?? '',
      createdAt: product?.createdAt ?? new Date().toISOString(),
      quantity: product?.quantity ?? 10,
      category: product?.category?.id ?? undefined,
      title: product?.title ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
    })
  }, [form, product]) //

  React.useEffect(() => {
    const fetchCategories = async () => {
      const cats = await getCategories() // Do not import DAO
      setCategories(cats)
    }
    fetchCategories()
  }, [])

  const handleSubmitAction = async (prod: FormProductSchemaType) => {
    setIsPending(true)
    const formData = new FormData()
    for (const [key, value] of Object.entries(prod)) {
      formData.append(key, value as string | Blob)
    }
    formAction(formData)
  }
  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={form.handleSubmit(handleSubmitAction)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product title</FormLabel>
              <FormControl>
                <Input placeholder="ex : Iphone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="199" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({field}) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormLabel>Catégorie</FormLabel>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id ?? ''}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({field}) => (
            <FormItem>
              <FormLabel>Product quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Product quantity"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Buttons isSubmitting={isPending} />
        </div>
      </form>
    </Form>
  )
}
const Buttons = ({isSubmitting}: {isSubmitting: boolean}) => {
  //const status = useFormStatus()

  return (
    <>
      <Button size="sm" type="submit" disabled={isSubmitting}>
        Save
      </Button>
      <Button size="sm" variant="outline">
        Cancel
      </Button>
    </>
  )
}
