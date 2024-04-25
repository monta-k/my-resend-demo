import 'firebase/auth'
import { getFirebaseAdmin } from './cert'
import { BASE_PATH } from '@/env'

export async function generateSignInWithEmailLink(email: string): Promise<string> {
  return await getFirebaseAdmin().generateSignInWithEmailLink(email, {
    url: BASE_PATH,
    handleCodeInApp: true
  })
}
