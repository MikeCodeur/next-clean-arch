import {z} from 'zod'

export const labelShema = z.object({
  label: z.string().trim().min(4, {
    message: 'must be at least 4 characters.',
  }),
})

export const createEditProductSchema = z.object({
  id: z.string().optional(),
  createdAt: z.string().optional(),
  quantity: z.coerce.number(),
  category: z.string(),
  price: z.coerce.number(),
  title: z.string().trim().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().trim().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
})
