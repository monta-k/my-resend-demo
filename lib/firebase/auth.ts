import { useState, useCallback } from 'react'
import { auth } from './client'
import { removeTokenFromCookie, getTokenFromCookie } from '../cookie'
import { sendSignInLinkToEmail, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { BASE_PATH } from '@/env'
import { postLinkEmail } from '../api'

export const EMAIL_FOR_SIGN_UP = 'emailForSignUp'

export const useAuthCookie = () => {
  return getTokenFromCookie()?.idToken
}

export const useSendSignInLinkToEmail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSendSignInLinkToEmail = useCallback(
    async (email: string) => {
      setIsLoading(true)

      try {
        await postLinkEmail(email)
        window.localStorage.setItem(EMAIL_FOR_SIGN_UP, email)
        router.push('/sent-email')
      } catch (err: any) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, router]
  )
  return {
    handleSendSignInLinkToEmail,
    isLoading
  }
}

export const useSignOut = () => {
  const router = useRouter()
  const handleSignOut = () => {
    signOut(auth)
      .then(async () => {
        // Sign-out successful.
        removeTokenFromCookie()
        router.push('/login')
      })
      .catch(error => {
        // An error happened.
        console.error(error)
      })
  }
  return { handleSignOut }
}
