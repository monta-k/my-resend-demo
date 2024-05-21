import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { RESEND_API_KEY } from '@/env'
import { PostResetPasswordLinkParams } from '../_type/resetPassword'
import { generateResetPasswordLink } from '@/backend/lib/firebase-admin/auth'
import { EmailTemplate } from './_EmailTemplate'

const resend = new Resend(RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()
  const postParamsResult = PostResetPasswordLinkParams.safeParse(body)
  if (!postParamsResult.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const emailLink = await generateResetPasswordLink(postParamsResult.data.email)

  await resend.emails.send({
    from: 'noreply@resend.dev',
    to: postParamsResult.data.email,
    subject: 'Reset password link',
    react: EmailTemplate({ linkUrl: emailLink })
  })

  return NextResponse.json({ message: 'ok' }, { status: 201 })
}
