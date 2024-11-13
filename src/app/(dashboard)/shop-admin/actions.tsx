'use server'
// DO NOT INCLUDE @/db/....
import {revalidatePath} from 'next/cache'
import {
  createEditProductFormSchema,
  FormProductSchemaType,
} from './[page]/form/product-form-validation'
import {cache} from 'react'
import db from '@/db/schema'
import {
  CreateEditProduct,
  DeleteProductModel,
  ProductModel,
  products,
} from '@/db/schema/products'
import {and, count, eq} from 'drizzle-orm'
import {auth} from '@/auth'
import {UserModel} from '@/db/schema/users'

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
export async function getProductsPagination(nbElement: number, start: number) {
  const resultQuery = await db.query.products.findMany({
    offset: start,
    limit: nbElement,
    with: {
      category: true,
    },
    orderBy: (product, {asc}) => [asc(product.id)],
  })

  const rows = await db.select({count: count()}).from(products)

  return {
    products: resultQuery,
    totalProducts: rows[0].count,
  }
}

export const getCategories = async () => {
  const products = await getCategoriesDao()
  return products
}

export const persistProduct = async (product: CreateEditProduct) => {
  await persistProductDao(product)
  revalidatePath('/exercises/shop-admin')
}

export const deleteProduct = async (product: ProductModel) => {
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

export const getUserLabel = cache(async (user?: UserModel) => {
  return user ? `Hi ${user.name} (${user.role})` : 'Hi, Guest'
})

export async function getProductByNameDao(name: string) {
  const resultQuery = await db.query.products.findMany({
    with: {
      category: true,
    },

    where: (products, {eq}) => eq(products.title, name),
    orderBy: (categories, {asc}) => [asc(categories.id)],
  })

  return resultQuery
}
export async function persistProductDao(product: CreateEditProduct) {
  console.log('persistProductDao product', product)
  const rows = await db
    .insert(products)
    .values(product)
    .onConflictDoUpdate({target: products.id, set: product})
  return rows
}
export async function getProductsDao() {
  const resultQuery = await db.query.products.findMany({
    with: {
      category: true,
    },
    orderBy: (products, {desc}) => [desc(products.createdAt)],
    limit: 20,
  })

  return resultQuery
}
export async function getCategoriesDao() {
  const resultQuery = await db.query.categories.findMany({})
  return resultQuery
}
export const deleteProductDao = async (productParams: DeleteProductModel) => {
  await db.delete(products).where(and(eq(products.id, productParams.id)))
}
export const getUserByEmailDao = async (email: string) => {
  const row = await db.query.users.findFirst({
    with: {
      profileInfo: true,
    },
    where: (user, {eq}) => eq(user.email, email),
  })
  return row
}
