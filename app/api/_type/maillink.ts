import * as z from 'zod'

export const PostMailLinkParams = z.object({
  email: z.string().email()
})
