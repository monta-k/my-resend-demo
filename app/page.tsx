'use client'
import { EMAIL_FOR_SIGN_UP, useSignOut } from '@/lib/firebase/auth'
import { auth } from '@/lib/firebase/client'
import { isSignInWithEmailLink, onAuthStateChanged, signInWithEmailLink } from 'firebase/auth'
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Index() {
  const [uid, setUid] = useState<string | null>(null)
  const { handleSignOut } = useSignOut()
  const router = useRouter()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUid(user.uid)
        return
      }

      // 適切なメールリンクかどうかを確認
      if (!isSignInWithEmailLink(auth, window.location.href)) {
        router.push('/login')
      }

      const emailFormSignUp = window.localStorage.getItem(EMAIL_FOR_SIGN_UP)
      if (emailFormSignUp) {
        signInWithEmailLink(auth, emailFormSignUp, window.location.href)
          .then(result => {
            window.localStorage.removeItem(EMAIL_FOR_SIGN_UP)
            if (result.user) {
              setUid(result.user.uid)
            }
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        router.push('/login')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [router])
  return (
    <div className="min-h-screen flex-col flex items-center justify-between">
      <div className="m-auto">
        {uid ? (
          <div>
            <p>ログインしました</p>
            <p>uid: {uid}</p>
          </div>
        ) : (
          <p>ログイン中...</p>
        )}
        <button
          className="mt-2 shadow text-black bg-white focus:shadow-outline focus:outline-none py-2 px-4 rounded"
          onClick={handleSignOut}
        >
          ログアウト
        </button>
      </div>
    </div>
  )
}
