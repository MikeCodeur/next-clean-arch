import {DeleteProduct} from '@/lib/product-types'
import z from 'zod'

export const deleteProductSchema = z.object({
  id: z.string(),
}) satisfies z.Schema<DeleteProduct>

export const createEditProductSchema = z.object({
  id: z.string().optional(),
  createdAt: z.string().optional(),
  quantity: z.coerce.number().optional(),
  category: z.string(),
  price: z.coerce.number(),
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
})
export type FormProductSchemaType = z.infer<typeof createEditProductSchema>

export const updateProductShema = createEditProductSchema.extend({
  id: z.string(),
  category: z.string(),
})
