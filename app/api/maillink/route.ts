import { NextResponse } from 'next/server'
import { PostMailLinkParams } from '../_type/maillink'
import { generateSignInWithEmailLink } from '@/backend/lib/firebase-admin/auth'
import { EmailTemplate } from './_EmailTemplate'
import { resend } from '@/backend/lib/resend'

export async function POST(request: Request) {
  const body = await request.json()
  const postParamsResult = PostMailLinkParams.safeParse(body)
  if (!postParamsResult.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const emailLink = await generateSignInWithEmailLink(postParamsResult.data.email)

  await resend.emails.send({
    from: 'noreply@resend.dev',
    to: postParamsResult.data.email,
    subject: 'Sign up link',
    react: EmailTemplate({ email: postParamsResult.data.email, linkUrl: emailLink })
  })

  return NextResponse.json({ message: 'ok' }, { status: 201 })
}
