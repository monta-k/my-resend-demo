import 'firebase/auth'
import * as admin from 'firebase-admin'
import { getFirebaseAdmin } from './cert'
import { BASE_PATH } from '@/env'

export async function verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
  return await getFirebaseAdmin().verifyIdToken(idToken)
}

export async function generateSignInWithEmailLink(email: string): Promise<string> {
  return await getFirebaseAdmin().generateSignInWithEmailLink(email, {
    url: BASE_PATH + '/set-password',
    handleCodeInApp: true
  })
}

export async function generateResetPasswordLink(email: string): Promise<string> {
  return await getFirebaseAdmin().generatePasswordResetLink(email, {
    url: BASE_PATH + '/signin',
    handleCodeInApp: true
  })
}

export async function generateVerifyAndChangeEmailLink(email: string, newEmail: string): Promise<string> {
  return await getFirebaseAdmin().generateVerifyAndChangeEmailLink(email, newEmail)
}
