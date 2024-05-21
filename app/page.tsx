'use client'
import { postUpdateEmail } from '@/lib/api'
import { useSignOut } from '@/lib/firebase/auth'
import { auth } from '@/lib/firebase/client'
import { onAuthStateChanged, verifyBeforeUpdateEmail } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { use, useCallback, useEffect, useState } from 'react'

export default function Index() {
  const [uid, setUid] = useState<string | null>(null)
  const { handleSignOut } = useSignOut()
  const router = useRouter()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user && user.emailVerified && user.providerData.some(provider => provider.providerId === 'password')) {
        setUid(user.uid)
        return
      }
      router.push('/signin')
    })

    return () => {
      unsubscribe()
    }
  }, [router])
  const handleUpdateEmail = useCallback(async (email: string) => {
    try {
      const currentUser = auth.currentUser
      if (!currentUser) return
      const idToken = await currentUser.getIdToken()
      await postUpdateEmail(idToken, email)
    } catch (err: any) {
      console.error(err)
    }
  }, [])
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
        <div className="my-2">
          <form
            action={async formData => {
              const email = formData.get('email')
              if (!email || typeof email !== 'string') return
              await handleUpdateEmail(email)
            }}
          >
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
              name="email"
              placeholder="email"
            />
            <button
              className="mt-2 shadow text-black bg-white focus:shadow-outline focus:outline-none py-2 px-4 rounded"
              type="submit"
            >
              メールアドレスを変更
            </button>
          </form>
        </div>
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
