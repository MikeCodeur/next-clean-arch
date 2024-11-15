'use server'
import {revalidatePath} from 'next/cache'
import {
  createEditProductFormSchema,
  FormProductSchemaType,
} from './[page]/form/product-form-validation'
import {cache} from 'react'

import {auth} from '@/auth'

import {
  deleteProduct as deleteProductDao,
  getCategories as getCategoriesDao,
  getProductByName as getProductByNameDao,
  getProducts as getProductsDao,
  getUserByEmail as getUserByEmailDao,
  persistProduct as persistProductDao,
} from '@/app/exercices/data-lib'
import {CreateEditProduct, Product} from '@/types/product-types'
import {User} from '@/types/user-types'

type ValidationError = {
  field: keyof FormProductSchemaType
  message: string
}

export type FormState = {
  success?: boolean
  errors?: ValidationError[]
  message?: string
}

export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = createEditProductFormSchema.safeParse(formData)

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

  const userConnected = await getConnectedUser()
  console.log('userConnected', userConnected)
  if (!userConnected) {
    return {
      success: false,
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
  const prod = await getProductByNameDao(data.get('title')?.toString() ?? '')
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
    await persistProductDao(parsed.data)
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
  const parsed = createEditProductFormSchema.safeParse(formData)
  const errorMessages = parsed?.error?.errors
    .map((err) => `${err.path} ${err.message}`)
    .join(', ')
  console.error('Zod errorMessages', errorMessages)
}

export const getUser = async () => {
  const userConnected = await getConnectedUser()
  return userConnected
}

export const getProducts = async () => {
  const products = await getProductsDao()
  return products
}

export const getCategories = async () => {
  const products = await getCategoriesDao()
  return products
}

export const persistProduct = async (product: CreateEditProduct) => {
  await persistProductDao(product)
  revalidatePath('/exercises/shop-admin')
}

export const deleteProduct = async (product: Product) => {
  await deleteProductDao(product)
  revalidatePath('/exercises/shop-admin')
}
export const getConnectedUser = cache(async () => {
  const session = await auth()
  if (!session?.user || !session.user.email) return
  console.log('getConnectedUser session.user', session.user)
  try {
    const user = await getUserByEmailDao(session.user.email)
    return user
    // return userDTO(user as UserModel)
  } catch (error) {
    console.error('Failed to fetch user', error)
    return
  }
})

export const getConnectedUserLabel = cache(async () => {
  const user = await getConnectedUser()
  return getUserLabel(user)
})

export const getUserLabel = cache(async (user?: User) => {
  return user ? `Hi ${user.name} (${user.role})` : 'Hi, Guest'
})
