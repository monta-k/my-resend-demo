import { relativeFetch } from './client'

export async function postLinkEmail(email: string) {
  return await relativeFetch(`/api/maillink`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
}

export async function postResetPassword(email: string) {
  return await relativeFetch(`/api/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
}

export async function postUpdateEmail(idToken: string, newEmail: string) {
  return await relativeFetch(`/api/update-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + idToken },
    body: JSON.stringify({ newEmail })
  })
}
