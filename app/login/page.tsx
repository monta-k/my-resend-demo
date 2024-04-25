'use client'
import { useSendSignInLinkToEmail } from '@/lib/firebase/auth'

export default function Login() {
  const { handleSendSignInLinkToEmail } = useSendSignInLinkToEmail()
  return (
    <div className="min-h-screen flex-col flex items-center justify-between">
      <div className="m-auto">
        <form
          action={async formData => {
            const email = formData.get('email')
            if (!email) return
            await handleSendSignInLinkToEmail(String(email))
          }}
        >
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                name="email"
                placeholder="email"
              />
            </div>
            <button
              className="ml-2 shadow text-black bg-white focus:shadow-outline focus:outline-none py-2 px-4 rounded"
              type="submit"
            >
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
