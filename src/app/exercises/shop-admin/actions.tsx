'use server'

import {revalidatePath} from 'next/cache'

import {
  deleteProductDao,
  getCategoriesDao,
  getProductByName,
  getProductsDao,
  persistProductDao,
} from '@/db/repositories/product'

import {
  createEditProductSchema,
  FormProductSchemaType,
} from '@/services/validations/product-validation'
import {Product, UpdateProduct} from '@/lib/product-types'

type ValidationError = {
  field: keyof FormProductSchemaType
  message: string
}

export type FormState = {
  success: boolean
  errors?: ValidationError[]
  message?: string
}

export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const formData = Object.fromEntries(data)
  const parsed = createEditProductSchema.safeParse(formData)

  console.log('parsed', parsed)
  if (!parsed.success) {
    logZodError(data)
    const validationErrors: ValidationError[] = parsed.error.errors.map(
      (err) => ({
        field: err.path[0] as keyof FormProductSchemaType,
        message: `zod server error ${err.message}`,
      })
    )
    return {
      success: false,
      errors: validationErrors,
      message: 'Server Error',
    }
  }

  if (data.get('title')?.toString().includes('  ')) {
    return {
      success: false,
      errors: [
        {
          field: 'title',
          message: 'Custom server error : Title must not contain 2 spaces',
        },
      ],
      message: 'Server Error',
    }
  }
  const prod = await getProductByName(data.get('title')?.toString() ?? '')
  if (prod && prod.length > 0 && prod[0].id !== parsed.data.id) {
    return {
      success: false,
      errors: [
        {
          field: 'title',
          message: 'Product allready exists',
        },
      ],
      message: 'Server Error',
    }
  }

  try {
    if (parsed.data.id === '') {
      delete parsed.data.id
    }
    await persistProductDao(parsed.data as UpdateProduct)
    revalidatePath('/exercises/shop-admin')
    return {
      success: true,
      message: 'Product Saved',
    }
  } catch (error) {
    return {
      success: false,
      message: `Unkown Server Error ${error}`,
    }
  }
}

function logZodError(data: FormData) {
  const formData = Object.fromEntries(data)
  const parsed = createEditProductSchema.safeParse(formData)
  const errorMessages = parsed?.error?.errors
    .map((err) => `${err.path} ${err.message}`)
    .join(', ')
  console.error('Zod errorMessages', errorMessages)
}

export const getProducts = async () => {
  const products = await getProductsDao()
  return products
}
export const getCategories = async () => {
  const products = await getCategoriesDao()
  return products
}

export const persistProduct = async (product: Product) => {
  await persistProductDao(product)
  revalidatePath('/exercises/shop-admin')
}

export const deleteProduct = async (product: Product) => {
  await deleteProductDao(product)
  revalidatePath('/exercises/shop-admin')
}
