import { FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY, FIREBASE_ADMIN_PROJECT_ID } from '@/env'
import * as admin from 'firebase-admin'
import 'firebase/auth'

export const cert = {
  projectId: FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/gm, '\n')
}

class Cache {
  static auth: admin.auth.Auth
}

export function getFirebaseAdmin(): admin.auth.Auth {
  if (Cache.auth) {
    return Cache.auth
  }
  if (admin.apps.length === 0) {
    admin.initializeApp({ credential: admin.credential.cert(cert) })
  }

  Cache.auth = admin.auth()
  return Cache.auth
}
