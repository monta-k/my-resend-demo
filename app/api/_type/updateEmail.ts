import * as z from 'zod'

export const PostUpdateEmailParams = z.object({
  newEmail: z.string().email()
})
