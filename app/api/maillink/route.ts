import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { RESEND_API_KEY } from '@/env'
import { PostMailLinkParams } from '../_type/maillink'
import { generateSignInWithEmailLink } from '@/backend/lib/firebase-admin/auth'
import { EmailTemplate } from './_EmailTemplate'

const resend = new Resend(RESEND_API_KEY)

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
