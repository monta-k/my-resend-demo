'use client'
import { useSignOut } from '@/lib/firebase/auth'
import { auth } from '@/lib/firebase/client'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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
