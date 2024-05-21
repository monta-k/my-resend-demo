import 'firebase/auth'
import { getFirebaseAdmin } from './cert'
import { BASE_PATH } from '@/env'

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
