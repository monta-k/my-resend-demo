import * as z from 'zod'

export const PostResetPasswordLinkParams = z.object({
  email: z.string().email()
})
