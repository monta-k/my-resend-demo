import { relativeFetch } from './client'

export async function postLinkEmail(email: string) {
  return await relativeFetch(`/api/maillink`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
}
