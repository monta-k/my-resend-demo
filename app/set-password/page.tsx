'use client'
import { EMAIL_FOR_SIGN_UP, useUpdatePassword } from '@/lib/firebase/auth'
import { auth } from '@/lib/firebase/client'
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Index() {
  const { handleUpdatePassword } = useUpdatePassword()
  const router = useRouter()
  useEffect(() => {
    // 適切なメールリンクかどうかを確認
    if (!isSignInWithEmailLink(auth, window.location.href)) {
      router.push('/login')
    }

    const emailFormSignUp = window.localStorage.getItem(EMAIL_FOR_SIGN_UP)
    if (emailFormSignUp) {
      signInWithEmailLink(auth, emailFormSignUp, window.location.href)
        .then(result => {
          window.localStorage.removeItem(EMAIL_FOR_SIGN_UP)
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      router.push('/login')
    }
  }, [router])
  return (
    <div className="min-h-screen flex-col flex items-center justify-between">
      <div className="m-auto">
        <form
          className="md:items-center"
          action={async formData => {
            const password = formData.get('password')
            const confirmPassword = formData.get('confirmPassword')
            if (!password || typeof password !== 'string') return
            if (!confirmPassword || typeof confirmPassword !== 'string') return
            if (password !== confirmPassword) return
            await handleUpdatePassword(password)
          }}
        >
          <div className="mb-6">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
              type="password"
              name="password"
              placeholder="password"
            />
          </div>
          <div className="mb-6">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
            />
          </div>
          <div className="mb-6">
            <button
              className="shadow text-black bg-white focus:shadow-outline focus:outline-none py-2 px-4 rounded"
              type="submit"
            >
              パスワードを設定
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
