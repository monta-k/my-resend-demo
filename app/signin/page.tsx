'use client'
import { useSignin } from '@/lib/firebase/auth'
import Link from 'next/link'

export default function Signin() {
  const { handleSignin } = useSignin()
  return (
    <div className="min-h-screen flex-col flex items-center justify-between">
      <div className="m-auto">
        <form
          className="md:items-center"
          action={async formData => {
            const email = formData.get('email')
            const password = formData.get('password')
            if (!email || typeof email !== 'string') return
            if (!password || typeof password !== 'string') return
            await handleSignin(email, password)
          }}
        >
          <div className="mb-6">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
              name="email"
              placeholder="email"
            />
          </div>
          <div className="mb-6">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
              type="password"
              name="password"
              placeholder="password"
            />
          </div>
          <div className="mb-6">
            <button
              className="shadow text-black bg-white focus:shadow-outline focus:outline-none py-2 px-4 rounded"
              type="submit"
            >
              ログイン
            </button>
          </div>
        </form>
        <div>
          <Link href="/signup">新規登録</Link>
        </div>
      </div>
    </div>
  )
}
