'use server'
import {revalidatePath} from 'next/cache'
import {
  createEditProductFormSchema,
  FormProductSchemaType,
} from './[page]/form/product-form-validation'

import {CreateEditProduct, Product} from '@/types/product-types'
import {quickAddProductFormSchema} from '@/services/validation/ui/product-form-validation'
import {
  createProductWithCategoryService,
  deleteProductService,
  getCategoriesService,
  getProductByNameService,
  getProductsService,
  persistProductService,
} from '@/services/product-service'
import {getConnectedUser} from '@/services/authentification/auth-service'

type ValidationError = {
  field: keyof FormProductSchemaType
  message: string
}

export type FormState = {
  success?: boolean
  errors?: ValidationError[]
  message?: string
}
export async function quickAddProduct(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = quickAddProductFormSchema.safeParse(formData)
  if (!parsed.success) {
    logZodError(data)
    return {
      success: false,
      message: `Erreur de validation du Formulaire`,
    }
  }
  try {
    const product = await createProductWithCategoryService(
      parsed.data.productName,
      parsed.data.categoryName
    )
    revalidatePath('/shop-admin')

    return {
      success: true,
      message: `Sauvegardé avec success `,
    }
  } catch (error) {
    return {
      success: false,
      message: `Erreur Service :  ${error}`,
    }
  }
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
  const prod = await getProductByNameService(
    data.get('title')?.toString() ?? ''
  )
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
    await persistProductService(parsed.data)
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
  const products = await getProductsService()
  return products
}

export const getCategories = async () => {
  const products = await getCategoriesService()
  return products
}

export const persistProduct = async (product: CreateEditProduct) => {
  await persistProductService(product)
  revalidatePath('/exercises/shop-admin')
}

export const deleteProduct = async (product: Product) => {
  await deleteProductService(product)
  revalidatePath('/exercises/shop-admin')
}
