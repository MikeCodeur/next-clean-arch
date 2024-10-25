import {DeleteProduct} from '@/services/types/domain/product-types'
import {z} from 'zod'

export const deleteProductServiceSchema = z.object({
  id: z.string(),
}) satisfies z.Schema<DeleteProduct>

export const createEditProductServiceSchema = z.object({
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

export const updateProductServiceShema = createEditProductServiceSchema.extend({
  id: z.string(),
  category: z.string(),
})

export type ServiceProductSchemaType = z.infer<
  typeof createEditProductServiceSchema
>
