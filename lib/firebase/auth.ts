import { useState, useCallback } from 'react'
import { auth } from './client'
import { removeTokenFromCookie, getTokenFromCookie } from '../cookie'
import { signInWithEmailAndPassword, signOut, updatePassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { BASE_PATH } from '@/env'
import { postLinkEmail } from '../api'

export const EMAIL_FOR_SIGN_UP = 'emailForSignUp'

export const useAuthCookie = () => {
  return getTokenFromCookie()?.idToken
}

export const useSignin = () => {
  const router = useRouter()
  const handleSignin = useCallback(async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/')
    } catch (err: any) {
      console.error(err)
    }
  }, [])

  return { handleSignin }
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
        router.push('/sent-signup-email')
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

export const useUpdatePassword = () => {
  const router = useRouter()
  const handleUpdatePassword = useCallback(
    async (password: string) => {
      try {
        const currentUser = auth.currentUser
        if (!currentUser) {
          return
        }
        await updatePassword(currentUser, password)
        router.push('/')
      } catch (err: any) {
        console.error(err)
      }
    },
    [router]
  )
  return { handleUpdatePassword }
}

export const useSignOut = () => {
  const router = useRouter()
  const handleSignOut = () => {
    signOut(auth)
      .then(async () => {
        // Sign-out successful.
        removeTokenFromCookie()
        router.push('/signin')
      })
      .catch(error => {
        // An error happened.
        console.error(error)
      })
  }
  return { handleSignOut }
}
