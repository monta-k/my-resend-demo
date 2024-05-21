import { NextResponse } from 'next/server'
import { PostUpdateEmailParams } from '../_type/updateEmail'
import { generateVerifyAndChangeEmailLink, verifyIdToken } from '@/backend/lib/firebase-admin/auth'
import { EmailTemplate } from './_EmailTemplate'
import { resend } from '@/backend/lib/resend'

export async function POST(request: Request) {
  const body = await request.json()
  const postParamsResult = PostUpdateEmailParams.safeParse(body)
  if (!postParamsResult.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const idToken = request.headers.get('Authorization')?.replace('Bearer ', '')
  if (!idToken) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }
  const verifiedData = await verifyIdToken(idToken)
  if (!verifiedData.email) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const emailLink = await generateVerifyAndChangeEmailLink(verifiedData.email, postParamsResult.data.newEmail)

  await resend.emails.send({
    from: 'noreply@resend.dev',
    to: postParamsResult.data.newEmail,
    subject: 'Update email link',
    react: EmailTemplate({ linkUrl: emailLink })
  })

  return NextResponse.json({ message: 'ok' }, { status: 201 })
}
