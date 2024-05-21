'use client'
import { postResetPassword } from '@/lib/api'
import { useSignin } from '@/lib/firebase/auth'
import { useRouter } from 'next/navigation'

export default function Signin() {
  const { handleSignin } = useSignin()
  const router = useRouter()
  return (
    <div className="min-h-screen flex-col flex items-center justify-between">
      <div className="m-auto">
        <form
          className="md:items-center"
          action={async formData => {
            const email = formData.get('email')
            if (!email || typeof email !== 'string') return
            await postResetPassword(email)
            router.push('/sent-reset-password-email')
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
            <button
              className="shadow text-black bg-white focus:shadow-outline focus:outline-none py-2 px-4 rounded"
              type="submit"
            >
              パスワードをリセット
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
