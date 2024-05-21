import { NextResponse } from 'next/server'
import { PostResetPasswordLinkParams } from '../_type/resetPassword'
import { generateResetPasswordLink } from '@/backend/lib/firebase-admin/auth'
import { EmailTemplate } from './_EmailTemplate'
import { resend } from '@/backend/lib/resend'

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
